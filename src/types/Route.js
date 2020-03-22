import magna from '../magna'
import qs from 'query-string'

import { pad, trace } from '../utils'
import regexify from '../utils/regexify'
import Predicate from './Predicate'

export default class Route extends Predicate {

  [Symbol.toStringTag] = 'Route';

  static plugin = {
    color: '#A82DFF',
    debug: true,
  }

  constructor(url, nodes = []) {
    super({ url }, nodes)
  }
  predicate({ request }) {
    return this.parser.regex.test(location.pathname)
  }

  processHref({ href, regex, params, keywords, index }) {
    const matches = href.match(regex)
    return !matches ? {} : index.reduce((acc, x, i) => ({
      ...acc,
      [x]: matches[i + 1]
    }), {})
  }

  createNewRequest({ request }) {
    const parser = regexify(this.config.url)
    const params = this.processHref({ href: location.pathname, ...parser })
    const search = qs.parse(location.search.slice(1), {
      plainObjects: true,
    })
    this.parser = parser
    this.params = params
    this.search = search
    return {
      ...request,
      params: {
        ...(request.params && request.params),
        ...params
      },
      search
    }
  }

  runInit({ request }) {
    const newRequest = this.createNewRequest({ request })
    return super.runInit({ request: newRequest })
  }

  runPopstate({ request }) {
    const newRequest = this.createNewRequest({ request })
    return super.runPopstate({ request: newRequest })
  }

 info(method, ...args) {
    let plugin = this.constructor.plugin
    if (magna.debug && (typeof plugin === 'undefined' || plugin.debug === true)) {
      plugin = plugin || { debug: true, color: '#777' }
      console.groupCollapsed(`%c%s %c%s`, 'color:#aaa', pad(10, this[Symbol.toStringTag]), `color: ${plugin.color}`, `${this.constructor.name}::${method}`, this.config.url)
      console.log(this, ...args)
      console.groupEnd()
    }
  }

}

