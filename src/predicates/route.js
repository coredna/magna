import Route from '../types/Route'

export { default as Route } from '../types/Route'

export default (url, nodes) =>
  new Route(url, nodes)
