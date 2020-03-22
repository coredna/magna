import { INITIALIZED } from '../symbols'
import log from '../utils/log'
import Node from './Node'

export default class Import extends Node {

  [Symbol.toStringTag] = 'Import';

  constructor(importer, nodes = []) {
    super({}, nodes)
    this.__promise = null
    this.importer = importer
  }
  initChildren() {
    this.nodes.forEach(node => node.parent = this)
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
          node.default.parent = this
          return node.default.runInit({ request })
        })
      )
  }
  runPopstate({ request }) {
    return super.runPopstate({ request })
      .then(result =>
        this[INITIALIZED] && this.__promise && this.__promise.then(node =>
          node.default.runPopstate({ request })
        )
      )
  }
  runDestroy({ request }) {
    return super.runDestroy({ request })
      .then(result =>
        this.__promise && this.__promise.then(node =>
          node.default.runDestroy({ request })
        )
      )
  }
  init({ request }) {
    return this.url
  }
}
