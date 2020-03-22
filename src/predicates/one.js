import Node from '../types/Node'
import { INITIALIZED } from '../symbols';
/*
* one
*
* Initialize the child nodes when the user fires an event from a page interaction
*
* ```
* import { Plugin, one } from '@carednavmagna'
* import { one } from '@magna/predicates/one'
*
* magna.use([
*   one('click', '#my-element', [
*     new Plugin()
*   ])
* ])
* ```
*/
export class One extends Node {

  #target = null
  #callback = null

  constructor(event, target, nodes) {
    super({ event, target }, nodes)
  }

  runInit({ request }) {
    this[INITIALIZED] = true
    // don't init the node, bind the event listener
    this.#target = document.querySelector(this.config.target)
    this.#target.addEventListener(this.config.event, (this.#callback = e => {
      // remove the event after it has been fired
      this.#target.removeEventListener(this.config.event, this.#callback)
      // once the event listener has fired load the node
      super.runInit({ request })
    }))
  }

  runDestroy({ request }) {
    // unbind the event
    this.#target.removeEventListener(this.config.event, this.#callback)
    // run destroy
    return super.runDestroy({ request })
  }

}

export default (target, event, nodes) =>
  new One(target, event, nodes)
