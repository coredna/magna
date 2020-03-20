import {
  INITIALIZED,
  INIT_PROMISE,
  INIT_DONE,
  POPSTATE_DONE,
  POPSTATE_PROMISE,
} from '../symbols'

import mergeDeepRight from 'ramda/src/mergeDeepRight'

import magna from '../'

import log from '../utils/log'
import { minimumLetters } from '../utils'

const PARENTS = new Map
const makeId = ((id) => () => (id++).toString(16))(16000)

// propagate down
class PropagateError extends Error {}
class BubbleError extends Error {}

export default class Node {

  [Symbol.toStringTag] = 'Node';

  constructor(config = {}, nodes = []) {

    if (this.constructor.defaultConfig) {
      this.config = mergeDeepRight(this.constructor.defaultConfig, config)
    } else if (this.constructor.config) {
      this.config = mergeDeepRight(this.constructor.config, config)
    } else {
      this.config = config
    }
    this.nodes = nodes
    this.id = makeId()

    this[INITIALIZED] = false
    this[INIT_PROMISE] = Promise.resolve(null)
    this[INIT_DONE] = false
    this[POPSTATE_PROMISE] = Promise.resolve(null)
    this[POPSTATE_DONE] = false

    this.initChildren()
  }
  initChildren() {
    this.nodes.forEach(node => node.parent = this)
  }
  init({ request, response }) {
    return this.id
  }
  destroy({ request }) {
  }
  popstate({ request, response }) {
    this.info('popstate')
  }
  shouldInitialize({ request }) {
    return !this.parent || this.parent[INITIALIZED]
  }
  initPromise({ request }) {
    return Promise.resolve(`http: ${this.id}`)
  }
  getInitPromise({ request }) {
    this[INITIALIZED] = false
    if (this.shouldInitialize({ request })) {
      this.info(`init`)
      this[INITIALIZED] = true
      return this.initPromise({ request })
    }
  }
  popstatePromise({ request }) {
    return Promise.resolve(`popstate: ${this.id}`)
  }
  getPopstatePromise({ request }) {
    this[INITIALIZED] = false
    if (this.shouldInitialize({ request })) {
      this[INITIALIZED] = true
      return this.popstatePromise({ request })
    }
  }
  getParentInitPromise() {
    return this.parent ? this.parent[INIT_PROMISE] : Promise.resolve('root')
  }
  getParentPopstatePromise() {
    return this.parent ? this.parent[POPSTATE_PROMISE] : Promise.resolve('root')
  }
  runInit({ request }) {
    // wait for both the parent and own promise to resolve
    this[INIT_PROMISE] = Promise.all([
      // get parent promise
      this.getParentInitPromise({ request }),
      // own promise
      this.getInitPromise({ request })
    ])
    // resolve the promise
      .then(([parentResponse, response]) => {
        // only call init if the Node is initialized
        if (this[INITIALIZED]) {
          return Promise.resolve(
            this.init({
              request,
              response
            })
          )
        }
      })
      .catch(error => this.runCatch({ request, error }))

    // call all the nodes
    this[INIT_DONE] = Promise.all([
      this[INIT_PROMISE],
      ...this.nodes.map(node =>
        node.runInit({ request })
      )
    ])

    return this[INIT_DONE]
  }

  runPopstate({ request }) {
    this[POPSTATE_PROMISE] = Promise.all([
      // get parent promise
      this.getParentPopstatePromise({ request }),
      // own promise
      this.getPopstatePromise({ request }),
    ])
      .then(([ parentPopstateResult, popstateResult ]) => {
        // only call init if the Node is initialized
          if (this[INITIALIZED]) {
            return Promise.resolve(
              this.popstate({
                request,
                response: popstateResult,
                popstateResult
              })
            )
          }
        }
      )
      // resolve the promise
      .catch(error => this.runCatch({ request, error }))

    // call all the nodes
    this[POPSTATE_DONE] = Promise.all([
      this[POPSTATE_PROMISE],
      ...this.nodes.map(node =>
        node.runPopstate({ request })
      )
    ])

    return this[POPSTATE_DONE]
  }

  runDestroy({ request }) {
    if (this[INITIALIZED]) {
      this.info('destroy')
      this[INITIALIZED] = false
      const resolved = this.nodes.map(node => node.runDestroy({ request }))
      return Promise.all([
        this.destroy({ request }),
        ...resolved
      ])
    }
    return Promise.resolve()
  }

  runCatch({ request, error }) {
    return this.catch({ request, error })
  }

  catch({ request, error }) {
    if (this[INITIALIZED]) {
      this[INITIALIZED] = false
      switch (error.constructor) {
        case PropagateError:
          if (this.onPropigateError({ request, error }) !== false) {
            this.nodes.forEach(node => node.catch({ request, error, stack: error.stack }))
          }
          break
        case BubbleError:
          if (this.onBubbleError({ request, error }) !== false) {
            this.parent.catch({ request, error, stack: error.stack })
          }
          break
        case Error:
          this.onCatch({ request, error, stack: error.stack })
        // do something for standard error
      }
      console.error(error)
      log(`${this.constructor.name}::error`, '#e6194b', {
        self: this,
        error,
        stack: error.stack,
      })
    }
  }

  onCatch({ request, error }) {
    this.log('onCatch', { request, error })
  }

  onPropigateError({ request, error }) {

  }
  onBubbleError({ request, error }) {

  }

  get parent() {
    return PARENTS.get(this)
  }
  set parent(parent) {
    return PARENTS.set(this, parent)
  }

  log(method, message) {
    let plugin = this.constructor.plugin
    if (magna.debug && (typeof plugin === 'undefined' || plugin.debug === true)) {
      plugin = plugin || { debug: true, color: '#777' }
      console.log(`%c--> ${this.constructor.name}::${method}`, `color: ${plugin.color||'#000'}`, message, this)
    }
  }

  info(method, ...args) {
    let plugin = this.constructor.plugin
    if (magna.debug && (typeof plugin === 'undefined' || plugin.debug === true)) {
      plugin = plugin || { debug: true, color: '#777' }
      console.groupCollapsed(`%c%s %c%s`, 'color:#aaa', minimumLetters(10, this[Symbol.toStringTag]), `color: ${plugin.color}`, `${this.constructor.name}::${method}`)
      console.log(this, ...args)
      console.groupEnd()
    }
  }

  setState(path, stateReducer) {
    magna.setState(path, stateReducer)
    return magna.getState(path)
  }

  subscribe(path, cb) {
    magna.subscribe(this, path, cb)
    return true
  }

  unsubscribe(path, cb) {
    magna.unsubscribe(this, path, cb)
    return true
  }

  loaderStart() {}
  loaderStop() {}
}
