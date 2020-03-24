import Magna from '../src/types/Magna'
import Node from '../src/types/Node'
import Request from '../src/request/Request'
import route from '../src/predicates/route'
import {everyNodeNotInitialized, pathAt} from './utils'
import {INITIALIZED} from '../src/symbols'

describe('Routing', () => {

  const nodeActiveAt = pathAt(node => node[INITIALIZED] === true)
  const nodeInactiveAt = pathAt(node => node[INITIALIZED] === false)
  const viewNodeAt = pathAt(node => {
    console.log({node})
    return node[INITIALIZED] === true
  })

  test('routes disabled by default', () => {
    const app = new Magna([
      route('/test', [
        new Node({})
      ])
    ])
    expect(everyNodeNotInitialized(app)).toEqual(true)
  })

  test('route node disabled by default', () => {
    const app = new Magna([
      route('/test', [
        new Node({})
      ])
    ])
    const routeNodeInactive = nodeInactiveAt([0, 0])
    expect(routeNodeInactive(app)).toEqual(true)
  })

  test('route node active after start', () => {
    const mockRequest = new Request({
      type: 'test',
      href: '/test/the-slug',
      query: {
        one: 1
      }
    })
    const app = new Magna([
      route('/test/{slug}', [
        new Node({})
      ])
    ])
      .start({
        env: 'test',
        debug: false,
        request: mockRequest,
      })

    const routeNodeActive = nodeActiveAt([0, 0])
    expect(routeNodeActive(app)).toEqual(true)
  })

})

describe('Request', () => {

  const routingApp = nodes => {
    const mockRequest = new Request({
      type: 'test',
      href: '/test/the-slug?one=1',
      query: {
        two: '2'
      }
    })

    return new Magna([
      route('/test/{slug:string}', [
        route('/test/{url}', [
          new Node({}, nodes)
        ])
      ])
    ])
      .start({
        env: 'test',
        debug: false,
        request: mockRequest,
      })
  }

  test('Request combines params from href and query object', () => {
    class CheckRequestQuery extends Node {
      init({ request }) {
        expect(request.query).toEqual({ one: '1', two: '2' })
      }
    }
    routingApp([
      new CheckRequestQuery({})
    ])
  })

  test('Child nodes have parent route params in request', () => {
    class CheckRequestParams extends Node {
      init({ request }) {
        expect(request.params).toEqual({ slug: 'the-slug', url: 'the-slug' })
      }
    }
    routingApp([
      new CheckRequestParams({})
    ])
  })
})
