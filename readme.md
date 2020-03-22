# Magna framework
Magna is a tree based router, plugin runner and ajax framework

## Install
```
npm install @coredna/magna
```

## API
```javascript
import Magna, { 
  Import, 
  Node, 
  Predicate,
  Singleton,
  elementExists,
  route,
} from '@coredna/magna'

// create a plugin to add functionality to your page
class Foo extends Node {
  // set default config variables that will be merged with your plugin config
  static defaultConfig = {
    key: value 
  }
  constructor(config, childNodes = [])  {
    super(config, childNodes) 
  }
  // initialize your plugin, add events, state and modify the DOM
  init({ request, config }) {}
  // destroy your plugin, cleanup after yourself
  destroy({ request, config }) {}
  // handle navigation through ajax
  popstate({ request, response, config }) {}
}

// create a plugin that will only run once per load 
class Bar extends Singleton {
  // initialize only once per load 
  init({ request })  {
    // subscribe to a global shared state
    this.subscribe('bar.baz', state => {
      // do something when `bar.baz` changes 
    })
  }
}


class ShouldRun extends Predicate {
  static defaultConfig = {
    shouldRun: () => true 
  }
  // change the constructor api
  constructor(shouldRun) {
   super({ shouldRun });
  }
  // test something to decide whether child nodes should be initialized
  predicate({ request }) {
    return this.config.shouldRun()
  }
}

// initialize a new instance of Magna
const magna = new Magna([
  // run plugins globally on every page
  new Foo({}),
  // nest any Node
  new Foo({}, [
    new Foo({}, [
      new Foo({}) 
    ]) 
  ]),
  // run something only once with a Singleton
  new Bar({}),
  // use routing
  route('some-url', [
    // reuse plugins by passing in different config options
    new Foo({
      option: 'value'   
    })
  ]),
  // take params from the url string, all child Node's will have access through the request object
  route('some-other-url/{param:string}', [
    // reuse plugins
    new Foo({
      option: 'other-value'
    }),
    // lazily import other modules
    new Import(() => import('./some-other-module')) 
  ]),
  // make your router a decision tree by testing something
  new ShouldRun(() => true, [
    new Foo() 
  ]),
  // extend predicate to test something more specific
  elementExists('#some-element', [
    // use default params
    new Foo()
  ])
])
magna.start({
  env: 'production',
  debug: false
})
```

## Magna
Read the [documentation](docs/00_Magna.md)

* [Why use Magna](./docs/01_Why_use_magna.md)
* [What is Magna](./docs/02_What_is_magna.md)
* [Node](./docs/03_Node.md)
* [Plugin](./docs/04_Plugin.md)
* [Singleton](./docs/05_Singleton.md)
* [Predicate](./docs/06_Predicate.md)
* [Module](./docs/07_Module.md)
* [Import](./docs/08_Import.md)
* [Directory links](./docs/09_Directory_links.md)
* [Ajax](./docs/10_Ajax.md)
* [Delaying lifecycle methods](./docs/11_Delaying_lifecycle_methods.md)
* [Messaging between nodes](./docs/12_Messaging_between_nodes.md)


