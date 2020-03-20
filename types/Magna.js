import Node from './Node'
import $ from 'jquery'
import {INIT_PROMISE, INITIALIZED} from '../symbols'
import Request from '../request/Request'
import qs from 'qs'
import {
  logRoute,
  logAction,
  tap,
  combineUrlParams
} from '../utils';

import ramdaLensPath from 'ramda/src/lensPath'
import ramdaOver from 'ramda/src/over'
import ramdaView from 'ramda/src/view'
import ramdaEquals from 'ramda/src/equals'

const states = []
let STATE_UUID = 0

export default class Magna extends Node {

  debug = true
  env = 'development'
  setScrollOnPopstate = true;

  [Symbol.toStringTag] = 'Magna';

  constructor(nodes) {
    super({}, nodes)

    this.nodes = []
    this.__state = {}
    this.__subscribers = new Map()
    this[INITIALIZED] = true
    this.request = new Request({
      type: 'http',
      uuid: STATE_UUID,
      url: location.pathname
    })
    states.push(this.request)

    // add the initial request to the current state
    history.replaceState({
      ...history.state,
      ...this.request,
      scrollTop: document.body.scrollTop,
      index: states.length,
      prev: location.pathname,
    }, document.title)


    const _this = this

    this.__setActiveUrl()

    window.addEventListener('popstate', e => {
      if(e.state === null) {
         e.preventDefault();
         return false;
      }

      const request = this.request = {
        ...e.state,
        prev: states[states.length - 1].pathname
      }

      this.__setActiveUrl()
      // set the previous requests scrollTop position before setting the new Request
      logRoute('popstate', this)

      return this.runDestroy({ request })
        .then(destroyResults => {
          // const newRequest = new Request('popstate')
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

  getHistory() {
    return states
  }

  start({
    debug = false,
    env = 'development',
    setScrollOnPopstate = true,
  }) {
    logRoute('start', this)
    this.debug = debug
    this.env = env
    this.setScrollOnPopstate = setScrollOnPopstate
    this.runInit({ request: this.request })
      .then(x => (console.groupEnd(), x))
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

  pushState(obj, title, url, params) {
    STATE_UUID++
    // update the scrollTop of the current history entry
    history.replaceState({
      ...history.state,
      scrollTop: document.body.scrollTop,
      index: states.length
    }, document.title)

    this.request = new Request({
      type: 'popstate',
      uuid: STATE_UUID,
      href: location.pathname,
      url,
      params,
      title,
      ...obj,
    })
    const queryStringParams = qs.stringify(params, {
      encode: false,
      arrayFormat: 'brackets',
    })
    history.pushState(this.request, this.request.title, url + (queryStringParams ? '?' + queryStringParams : ''))
    this.__setActiveUrl()
    states.push(this.request)
    // set the previous requests scrollTop position before setting the new Request
    logRoute('pushState', this)
    return this.runDestroy({ request: this.request })
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
        this.request = new Request({ type: 'manual', ...this.request })
        this.init(this.request)
      })
    return this
  }

  __setActiveUrl() {
    const escapedPathname = location.pathname
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    $('.link--active').removeClass('link--active')
    $(`a[href]`)
      .filter(function() {
        const href = this.href.replace(location.origin, '')
        return new RegExp("^" + escapedPathname + "$").test(href)
      })
      .addClass('link--active')
  }

  static post = (() => {
    const timeout = 30000
    /*
    const keepAlive = () => {
      $.post('/index.php?action=register&form_name=keepAlive', {
        custom_data: 'json/keepalive'
      }, null, 'json')
      .then(() => {
        timer = setTimeout(keepAlive, timeout)
      })
    }
    let timer = setTimeout(keepAlive, timeout)
     */

    return (url, data, { headers, method, dataType, $target } = { method: 'post', dataType: 'json' }) => {
      const xhr = new XMLHttpRequest
      return $.ajax({
        url,
        data,
        method,
        dataType,
        xhr: () => xhr,
        ...(typeof(headers) !== 'undefined' &&
          typeof(headers) === 'function'
            ? { beforeSend: (xhr) => headers(xhr, $target) }
            : { headers }
          ),
      })
      /*
      .then(tap(response => {
        clearTimeout(timer)
        timer = setTimeout(keepAlive, timeout)
      }))
         */
      .catch(error => {
        $('body')
          .removeClass('loading')
          .addClass('error')
        $('.content').html(`<h1>404: Oops we can't find what you are looking for</h1>`)
      })
    }

  })()

  getState(path) {
    return { ...this.__state }
  }

  setState(path, stateUpdater) {
    if (typeof path === 'string') path = path.split('.')
    path = path || ['global']
    const oldState = this.__state
    const lens = ramdaLensPath(path)
    // set the new state
    const newState = ramdaOver(lens, stateUpdater, this.__state)
    // const newState = stateUpdater(this.__state)
    if (newState === this.__state) {
      throw new Error('Do not mutate the state, please return a new object for the state')
    }
    this.__state = newState

    // trigger any subscribers
    for (const [subscribePath, subscribers] of this.__subscribers) {
      const subscribeLens = ramdaLensPath(subscribePath.split('.'))
      const a = ramdaView(subscribeLens, oldState)
      const b = ramdaView(subscribeLens, newState)
      // check to see if the previous state has changed at this path
      if (!ramdaEquals(a, b)) {
        // state has changed, fire the events
        subscribers.forEach(({ instance, cb }) => {
          if (instance[INITIALIZED]) {
            ramdaOver(subscribeLens, cb, newState)
          }
        })
      }
      /*
      console.log('equals', R.equals(subscribePath, path))
      if (subscriber[NODE_INITIALIZED] && R.equals(subscribePath, path)) {
        callbacks.forEach(cb => R.over(lens, cb, newState))
      }
      */
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