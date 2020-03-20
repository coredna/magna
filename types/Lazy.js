import { INITIALIZED } from '../symbols'
import log from '../utils/log'
import Node from './Node'

export default class Lazy extends Node {

  [Symbol.toStringTag] = 'Lazy';

  constructor(importer, config, nodes = []) {
    super(config, nodes)
    this.__promise = null
    this.importer = importer
    this.instance = null
  }
  initChildren() {
    // this.instance.parent = this
  }
  initPromise({ request }) {
    return (this.__promise = this.__promise || this.importer({ request }))
  }
  popstatePromise({ request }) {
    return (this.__promise = this.__promise || this.importer({ request }))
  }
  runInit({ request }) {
    return super.runInit({ request })
      .then(result =>
        this[INITIALIZED] && this.__promise && this.__promise.then(node => {
          this.instance = new node.default(this.config)
          this.instance.runInit({request})
          return this.instance
        })
      )
  }
  runPopstate({ request }) {
    return super.runPopstate({ request })
      .then(result =>
        this[INITIALIZED] && this.__promise && this.__promise.then(node =>
          this.instance.runPopstate({ request })
        )
      )
  }
  runDestroy({ request }) {
    return super.runDestroy({ request })
      .then(result =>
        this.__promise && this.__promise.then(node =>
          this.instance.runDestroy({ request })
        )
      )
  }
  init({ request }) {
    return this.url
  }
}
