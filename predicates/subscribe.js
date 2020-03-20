import Node from '../types/Node'
import magna from "@magna";
import { INITIALIZED } from '../symbols'

/*
* subscribe
*
* Subscribe to state changes, when the state changes the plugin will be initialized
* It will only ever initialize once per lifecycle, which is reset when popstate fires
*
* ```
* import Plugin from '@magna/types/Plugin'
* import { subscribe } from '@magna/predicates/subscribe'
*
* magna.use([
*   subscribe('my.custom.event', [
*     new Plugin()
*   ])
* ])
* ```
*/
export default class Subscribe extends Node {

  constructor(event, nodes) {
    super({ event }, nodes)
  }

  runInit({ request }) {
    // INITIALIZED must be set for the event to fire when the state is changed
    this[INITIALIZED] = true
    // don't init the node, bind the event listener
    this.subscribe(this.config.event, (this.__onEvent = e => {
      // once the event listener has fired load the node
      this.unsubscribe(this.config.event, this.__onEvent)
      super.runInit({ request })
    }))
  }

  runDestroy({ request }) {
    // unbind the event
    this.unsubscribe(this.config.event, this.__onEvent)
    // run destroy
    super.runDestroy({ request })
  }
}

export const subscribe = (target, event, nodes) =>
  new Subscribe(target, event, nodes)