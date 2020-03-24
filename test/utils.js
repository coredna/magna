import { INITIALIZED } from '../src/symbols'
import Node from '../src/types/Node'

export const traverseEvery = predicate => function traverse(node) {
  return predicate(node) && node.nodes.length
    ? node.nodes.every(traverse)
    : true
}

export const traverseSome = predicate => function traverse(node) {
  return predicate(node) && node.nodes.length
    ? node.nodes.some(traverse)
    : true
}

export const pathEvery = predicate => function traverse([x, ...path]) {
  return function(node)  {
    return predicate(node)
      ? node.nodes[x] instanceof Node && traverse(path)(node.nodes[x])
      : true
  }
}

export const pathAt = predicate => function traverse([x, ...path]) {
  return function(node)  {
    return x != null && node.nodes[x] != null
      ? traverse(path)(node.nodes[x])
      : predicate(node)
  }
}

export const everyNodeInitialized = traverseEvery(node => node[INITIALIZED])
export const everyNodeNotInitialized = traverseEvery(node => node[INITIALIZED] === false)
