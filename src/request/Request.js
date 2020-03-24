import {
  combineUrlParams,
  mergeDeepRight,
} from '../utils';
import qs from 'query-string'

let prev = null
const createUUid = ((x) => () => x++ )(0)
export default class Request {

  type = 'http'
  keywords = []
  params = {}
  values = []
  scrollTop = 0
  query = {}

  /**
   * @param {String} [type] ('http'|'popstate')
   */
  constructor({
    type = 'http',
    uuid = createUUid(),
    href = location.href,
    query = {},
    scrollTop = 0,
    title = document.title
  } = {}) {
    this.prev = prev
    this.type = type
    this.uuid = uuid
    if (~href.indexOf('http') && location.origin) {
      href = href.replace(location.origin, '')
    }
    const index = href.indexOf('?')
    const queryStringParams = index > -1 ? qs.parse(href.slice(index + 1)) : {}
    // create the searchParams from the href and the passed in searchParams
    this.query = mergeDeepRight(
      queryStringParams,
      query,
    )
    // stringify the params for use in the application
    this.search = qs.stringify(this.query, {
      encode: false,
      arrayFormat: 'brackets'
    })
    this.pathname = index > -1 ? href.slice(0, index) : href
    // create the new href by combining the pathname and all the params
    this.href = this.pathname + (this.search ? `?${this.search}` : '')
    this.title = title
    this.scrollTop = scrollTop
    prev = this.pathname
  }

  combineParams({
    params,
  }) {
    this.params = mergeDeepRight(this.params, params)
    // NOTE: this could return a new instance of Request to be immutable
    // => Request({ ...this, params: mergeDeepRight(this.params, params) })
    return this
  }
}


const req = {
  type: 'http',
  pathname: location.pathname,
  href: location.href,
  params: {}
}
