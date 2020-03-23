import Magna from '../src/types/Magna'
import Node from '../src/types/Node'
import {
  traverseEvery,
  everyNodeInitialized,
  everyNodeNotInitialized,
} from './utils'

import { INITIALIZED } from '../src/symbols'

describe('Magna instance', () => {

  test('Can create multiple Magna instances', () => {
    const app1 = new Magna
    const app2 = new Magna
    expect(app1).not.toEqual(app2)
  })

  test('Magna instance not initialized when constructed', () => {
    const app = new Magna()
    expect(everyNodeNotInitialized(app)).toEqual(true)
  })

  test('Allows adding child nodes', () => {
    const app = new Magna([
      new Node()
    ])
    expect(app.nodes.length).toEqual(1)
  })

  test('Child nodes are inactive by default', () => {
    const app = new Magna()
    app.use([
      new Node()
    ])
    expect(everyNodeNotInitialized(app)).toEqual(true)
  })

  test('Initializes child nodes when calling start', () => {
    const app = new Magna()
    app.use([
      new Node(),
      new Node(),
    ])
      .start({
        env: 'test',
        debug: false,
      })
    expect(everyNodeInitialized(app)).toEqual(true)
  })

  test('Allows adding nested child nodes', () => {
    const app = new Magna()

    app.use([
      new Node({}, [
        new Node({}, [
          new Node({}, [
            new Node(),
            new Node(),
          ]),
          new Node({}, [
            new Node(),
            new Node(),
          ])
        ])
      ]),
    ])
      .start({
        env: 'test',
        debug: false,
      })
    expect(everyNodeInitialized(app)).toEqual(true)
  })

  test('Nested child nodes not initialized by default', () => {
    const app = new Magna()

    app.use([
      new Node({}, [
        new Node({}, [
          new Node({}, [
            new Node()
          ])
        ])
      ]),
    ])
    expect(everyNodeNotInitialized(app)).toEqual(true)
  })
})
