import Node from './Node'
import {INIT_PROMISE, INITIALIZED} from '../symbols'
import Request from '../request/Request'
import qs from 'query-string'
import {
  logRoute,
  logAction,
  tap,
  combineUrlParams
} from '../utils';

import { lensPath } from 'rambda/src/lensPath'
import { over } from 'rambda/src/over'
import { view } from 'rambda/src/view'
import { equals } from 'rambda/src/equals'

// TODO: move scoped variables to private properties to allow better testing

export default class Magna extends Node {

  debug = true
  env = 'development'
  setScrollOnPopstate = true;

  [Symbol.toStringTag] = 'Magna';

  constructor(nodes) {
    super({}, nodes)

    this.__state = {}
    this.__subscribers = new Map()
    this[INITIALIZED] = false

    // add the initial request to the current state
    history.replaceState({
      ...history.state,
      scrollTop: document.body.scrollTop,
    }, document.title)

    this.__setActiveUrl()

    window.addEventListener('popstate', e => {
      if(e.state === null) {
         e.preventDefault();
         return false;
      }

      const request = this.request = new Request(e.state)

      this.__setActiveUrl()
      // set the previous requests scrollTop position before setting the new Request
      logRoute('popstate', this)

      return this.runDestroy({ request })
        .then(destroyResults => {
          console.groupEnd()
          logRoute('popstate', this)
          return this.runPopstate({ request })
            .then(xs => (console.groupEnd(), xs))
            .then(xs => (logRoute('init', this), xs))
            .then(xs => this.runInit({ request }))
            .then(xs => (console.groupEnd(), xs))
            .then(xs => {
              // push a Pageview to tagmanager
              window.dataLayer && window.dataLayer.push({
                event: 'Pageview',
                url: location.href,
              })
              return xs
            })
        })
    })
  }

  initChildren() {
    this.nodes.forEach(node => {
      node.parent = this
    })
  }

  start({
    debug = false,
    env = 'development',
    setScrollOnPopstate = true,
    request = null, // allow passing a request object for testing purposes
  }) {
    this.debug = debug
    this.env = env
    this.setScrollOnPopstate = setScrollOnPopstate
    this[INITIALIZED] = true
    this.request = request ?? new Request()
    logRoute('start', this)
    this.initChildren()
    this.runInit({ request: this.request })
      .then(x => (console.groupEnd(), x))
    return this
  }

  popstate({ request, response }) {
    // push a Pageview to tagmanager
    if (this.debug) console.log('popstate', response)
      window.dataLayer && window.dataLayer.push({
        event: 'Pageview',
        url: location.href,
      })
    // document.body.scrollTop = this.setScrollOnPopstate && this.request.request.scrollTop || 0
    if (this.debug) console.groupEnd()
    return Promise.resolve()
  }


  pushState(obj, title, href, params) {
    this.request = new Request({
      type: 'popstate',
      href,
      params,
      title,
    })
    return this.pushStateWithRequest(this.request)
  }

  pushStateWithRequest(request) {
    // update the scrollTop of the entry about to be replaced
    history.replaceState({
      ...history.state,
      scrollTop: document.body.scrollTop,
    }, document.title)

    // push the new state with the native browser api
    history.pushState(request, request.title, request.href)

    this.__setActiveUrl()

    // set the previous requests scrollTop position before setting the new Request
    logRoute('pushState', this)
    return this.runDestroy({ request })
      .then(destroyResults => {
        // const newRequest = new Request('popstate')
        console.groupEnd()
        logRoute('popstate', this)
        return this.runPopstate({ request: this.request })
          .then(xs => (console.groupEnd(), xs))
          .then(xs => (logRoute('init', this), xs))
          .then(xs => this.runInit({ request: this.request }))
          .then(xs => (console.groupEnd(), xs))
          .then(xs => {
            // push a Pageview to tagmanager
            window.dataLayer && window.dataLayer.push({
              event: 'Pageview',
              url: location.href,
            })
            return xs
          })
      })
  }

  use(nodes) {
    this.nodes = [...this.nodes, ...nodes]
    this.initChildren()
    return this
  }

  rerun() {
    this.destroy(this.request)
      .then((responses) => {
        this.request = new Request({
          type: 'manual', ...this.request
        })
        this.init(this.request)
      })
    return this
  }

  __setActiveUrl() {
    const escapedPathname = location.pathname
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    document.querySelectorAll('.link--active').forEach(element =>
      element.classList.remove('link--active')
    )
    ;([...document.querySelectorAll('a[href]')])
      .filter(element => {
        const href = element.href.replace(location.origin, '')
        return new RegExp("^" + escapedPathname + "$").test(href)
      })
      .forEach(element => element.classList.add('link--active'))
  }

  getState(path) {
    return { ...this.__state }
  }

  setState(path, stateUpdater) {
    if (typeof path === 'string') path = path.split('.')
    path = path || ['global']
    const oldState = this.__state
    const lens = lensPath(path)
    // set the new state
    const newState = over(lens, stateUpdater, this.__state)
    // const newState = stateUpdater(this.__state)
    if (newState === this.__state) {
      throw new Error('Do not mutate the state, please return a new object for the state')
    }
    this.__state = newState

    // trigger any subscribers
    for (const [subscribePath, subscribers] of this.__subscribers) {
      const subscribeLens = lensPath(subscribePath.split('.'))
      const a = view(subscribeLens, oldState)
      const b = view(subscribeLens, newState)
      // check to see if the previous state has changed at this path
      if (!equals(a, b)) {
        // state has changed, fire the events
        subscribers.forEach(({ instance, cb }) => {
          if (instance[INITIALIZED]) {
            over(subscribeLens, cb, newState)
          }
        })
      }
    }
    return this
  }

  subscribe(instance, path, cb) {
    path = !path ? 'global' : Array.isArray(path) ? path.join('.') : path
    let listeners = []
    if (this.__subscribers.has(path)) {
      listeners = this.__subscribers.get(path)
    }
    const containsListener = listeners.some(listener => listener.cb === cb && listener.instance === instance)
    // only set a callback once
    if (!containsListener) {
      listeners.push({ instance, cb, state: {} })
    }
    this.__subscribers.set(path, listeners)
  }

  unsubscribe(instance, path, cb) {
    path = Array.isArray(path) ? path.join('.') : String(path)
    const subscribers = this.__subscribers.get(path)
    const newEvents = subscribers.filter(subscriber =>
      subscriber.instance !== instance && subscriber.cb !== cb
    )
    this.__subscribers.set(path, newEvents)
    return true
  }

  trigger(path) {
    if (this.__subscribers.has(path)) {
      this.__subscribers.get(path).forEach(({ cb, instance }) => {
        if (instance[INITIALIZED]) {
          cb(this.getState())
          // send a signal through the browser event system so it can be subscribed to from anywhere
          window.dispatchEvent(new CustomEvent(path, {
            detail: {
              state: this.getState(),
              instance
            },
          }))
        }
      })
    }
  }

}
