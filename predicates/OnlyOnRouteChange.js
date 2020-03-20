import Node from '../types/Node'

export default class OnlyOnRouteChange extends Node {

  constructor(pattern, nodes) {
    super(pattern, nodes)
    this.nodes = nodes
    this.pattern = pattern
    this.regex = regexify(pattern)
  }

  initNodes({ request }) {
    if (this.regex.test(request.prev) !== this.regex.test(request.pathname)) {
      return super.initNodes({ request })
    }
    return Promise.resolve('OnlyOnRouteChange:same-url')
  }

  initDestroy({ request }) {
    if (this.regex.test(request.prev) !== this.regex.test(request.pathname)) {
      return super.initDestroy({ request })
    }
    return Promise.resolve('OnlyOnRouteChange:same-url')
  }

}

export const onlyOnRouteChange = (url, nodes) =>
  new OnlyOnRouteChange(url, nodes)
