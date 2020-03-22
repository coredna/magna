import { combineUrlParams} from '../utils';
import qs from 'query-string'

let prev = null
export default class Request {

  type = 'http'
  keywords = []
  params = {}
  values = []
  scrollTop = 0

  /**
   * @param {String} [type] ('http'|'popstate')
   */
  constructor({
    type = 'http',
    uuid = 0,
    url = location.pathname,
    params,
    scrollTop = 0,
  } = {}) {
    this.prev = prev
    this.type = type
    this.uuid = uuid
    this.pathname = url
    this.scrollTop = scrollTop
    this.params = qs.parse(location.search.slice(location.search.indexOf('?') + 1))
    this.href = combineUrlParams(url, params)
    prev = this.pathname
  }
}
