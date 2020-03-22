import Node from './Node'

import { tap, log } from '../utils'

export default class Plugin extends Node {

  [Symbol.toStringTag] = 'Plugin'

  constructor(options) {
    super(options)
  }
  init({ request }) {
    return request.url
  }
}
