import Node from './Node'

export default class Singleton extends Node {

  [Symbol.toStringTag] = 'Singleton'
  initialized = false

  constructor(options) {
    super(options)
  }
  shouldInitialize({ request }) {
    if (this.initialized)
      return false
    return (this.initialized = true)
  }
  init({ request }) {
    return request.url
  }
}
