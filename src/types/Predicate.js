import { INITIALIZED } from '../symbols'

import Node from './Node'

export default class Predicate extends Node {

  [Symbol.toStringTag] = 'Predicate';

  shouldInitialize({ request }) {
    return !this.parent || (this.parent[INITIALIZED] && this.predicate({ request }))
  }
  predicate({ request }) {
    throw new Error(`Predicate class must contain a predicate method that returns a boolean`)
  }
}
