import Node from '../types/Node'
import { INITIALIZED } from '../symbols';
/*
* one
*
* Initialize the child nodes when the user fires an event from a page interaction
*
* ```
* import Plugin from '@magna/types/Plugin'
* import { one } from '@magna/predicates/one'
*
* magna.use([
*   one('click', '#my-element', [
*     new Plugin()
*   ])
* ])
* ```
*/
export default class One extends Node {

  constructor(event, target, nodes) {
    super({ event, target }, nodes)
  }

  runInit({ request }) {
    this[INITIALIZED] = true
    // don't init the node, bind the event listener
    this.$target = $(this.config.target).one(this.config.event, (this.__onEvent = e => {
      // once the event listener has fired load the node
      super.runInit({ request })
    }))
  }

  runDestroy({ request }) {
    // unbind the event
    this.$target.off(this.config.event, this.__onEvent)
    // run destroy
    return super.runDestroy({ request })
  }
}

export const one = (target, event, nodes) =>
  new One(target, event, nodes)