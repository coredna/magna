import { log } from '../utils'

import Node from './Node'

export default class Module extends Node {

  [Symbol.toStringTag] = 'Module'

  constructor(nodes) {
    super({}, nodes)
  }
  init({ request }) {
    return request.url
  }
}