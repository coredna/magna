/**
 * Observer
 *
 * Decorate your state object with this class to allow you to subscribe to changes.
 * import { State } from '@coredna/magna'
 *
 * class MyClass extends Node {
 *   #state = new State({
 *     key: 'defaultValue'
 *   })
 *   init({ request }) {
 *     // subscribe to changes in the state using a path to the property
 *     this.#state.subscribe('foo.bar', value => console.log('foo.bar changed!', value))
 *     // set the state
 *     this.#state.foo = 'bar'
 *     // get the state value
 *     console.log(this.#state.foo)
 *     // set a state value using .set
 *     this.#state.set(prop, value)
 *     // get a state value using .get
 *     this.#state.get(prop)
 *     // safely set a part of the stat using a path
 *     this.#state.setState('path.to.property', state => newState)
 *     // Replace the current state and trigger any subscribers
 *     this.#state.unsafeReplaceState(newStateObj)
 *     // Trigger all listeners of a state
 *     this.#state.trigger()
 *     // Get a copy of the current state
 *     this.#state.getState()
 *     // Destroy the current state and all it's listeners
 *     this.#state.destroy()
 *   }
 * }
 */
import { path } from 'rambda/src/path'
import { always } from 'rambda/src/always'
import { clone } from 'rambda/src/clone'
import { equals } from 'rambda/src/equals'
import { lensPath } from 'rambda/src/lensPath'
import { over } from 'rambda/src/over'
import { view } from 'rambda/src/view'
import escapeRegexCharacters from './escapeRegexCharacters'

class StateObserver  {

  static handler = {
    get(obj, prop, receiver) {
      if (typeof obj[prop] === 'function') {
        return function proxied(...args) {
          return obj[prop].apply(obj, args)
        }
      }
      if (typeof obj[prop] === 'object' && typeof obj[prop] !== 'undefined') {
        return new StateObserver(obj[prop], StateObserver.handler)
      }
      return obj.get(prop)
    },
    set(obj, prop, val) {
      return obj.set(prop, val)
    },
  }

  constructor(target) {
    /*
    this fancy bit of code will allow us to subclass a Proxy, so when
    people look in the console they will see `StateObserver` rather than `Proxy`
    https://stackoverflow.com/a/38980779/1733478
    */
    Object.setPrototypeOf(this, new Proxy(target, StateObserver.handler))
  }
}

export default class State {

  // these are intentionally using __dunder names so developers can see the
  // state in developer tools without needing to call `State.getState()`
  __subscribers = new Map
  __state = {}

  constructor(state) {
    this.__state = state
    return new StateObserver(this)
  }

  get(prop) {
    return this.__state[prop]
  }

  unsafeReplaceState(newState) {
    const oldState = this.__state
    this.__state = newState
    this.#triggerSubscribers(oldState, this.__state)
    return newState
  }

  set(prop, val) {
    return this.setState(prop, always(val))
  }

  setState(path, stateUpdater) {
    path = Array.isArray(path) ? path.join('.') : path
    const oldState = this.__state
    const lens = lensPath(path, stateUpdater)
    // update the state using the stateUpdater function
    this.__state = over(lens, stateUpdater, this.__state)
    this.#triggerSubscribers(oldState, this.__state)
    // return the updated part of the state
    return view(lens, this.__state)
  }

  #triggerSubscribers(oldState, newState) {
    // trigger any subscribers
    for (const [subscribePath, subscribers] of this.__subscribers) {
      const subscribeLens = lensPath(subscribePath)
      const oldView = view(subscribeLens, oldState)
      const newView = view(subscribeLens, newState)
      // check to see if the previous state has changed at this path
      if (!equals(oldView, newView)) {
        // state has changed, fire the events
        subscribers.forEach(cb => {
          // only clone the new and old state if the developer is requesting it in their callback
          if (cb.length === 3)
            cb(newView, oldView, clone(newState))
          else if (cb.length === 4)
            cb(newView, oldView, clone(newState), clone(oldState))
          else
            cb(newView, oldView)
        })
      }
    }
  }

  subscribe(path, cb) {
    path = Array.isArray(path) ? path.join('.') : path
    if (!this.__subscribers.has(path)) {
      this.__subscribers.set(path, new Set([]))
    }
    this.__subscribers.get(path).add(cb)
  }

  unsubscribe(path, cb) {
    path = Array.isArray(path) ? path.join('.') : path
    if (this.__subscribers.has(prop))
      this.__subscribers.get(prop).delete(cb)
  }

  // TODO: figure out if we can subscribe to a path, maybe need to iterate through subscribers matching strings
  trigger(path) {
    if (path) {
      [...this.__subscribers.entries()]
        .filter(([key, value]) =>
          new RegExp("^" + escapeRegexCharacters(key), 'gmi').test(key)
        )
        .forEach(([key, cb]) => {
          const currentView = view(lensPath(key), this.__state)
          const currentState = clone(this.__state)
          cb(currentView, currentView, currentState, currentState)
        })
    }
    else {
      this.#triggerSubscribers({}, this.__state)
    }
  }

  getState() {
    return clone(this.__state)
  }

  getSubscribers() {
    return new Map([...this.__subscribers.entries()].map(([key, value]) => [key, new Set(value)]))
  }

  unsafeGetState() {
    return this.__state
  }

  unsafeGetSubscribers() {
    return this.__subscribers
  }

  destroy() {
    this.__subscribers = new Map()
    this.__state = {}
  }

}
