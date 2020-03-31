import Node from './Node'

export default class ExtendablePlugin extends Node {

  [Symbol.toStringTag] = 'ExtendablePlugin'

  getters = []

  constructor(config) {
    super(config)
    for (const key of Object.keys(this.config)) {
      Object.defineProperty(this, key, {
        get: () => this.config[key],
        set: (value) => this.config[key] = value
      })
    }
    for (key of this.getters) {
      Object.defineProperty(this, key, {
        get: () => this.config[key],
        set: (value) => this.config[key] = value
      })
    }
  }
  init({ request }) {
    return request.url
  }
}
