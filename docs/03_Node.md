## Node
Everything in Magna inherits it's functionality from a base `Node` class, this gives us a simple interface with 
three main methods for managing your page. Because we inherit from `Node` on each class we always have this interface
for loading and unloading our code. The basic methods for this are `constructor` & `init`. If you need to use ajax 
in your application please see the ajax section of this documentation.
 
 ```javascript
class Node {
  constructor(config = {}, nodes = []) {
    this.config = config
    this.nodes = nodes
  }
  init({ request }) {
    console.log('initialize the Node')
  }
}
```
 
#### constructor 
The constructor allows you to declare options to the `Node`, these options can be used during the lifecycle to allow 
you to write abstracted code, but have it change based on the options provided

#### init
Init is where you can bind all your events to the page, initialize your plugin make any updates to the page

```javascript
import Magna, { Plugin, route } from '@coredna/magna'
import $ from 'jquery'

class Modal extends Plugin {
  constructor({
    selector = '.modal',
    openSelector = '.modal__open',
    closeSelector = '.modal__close',
  } = {}) {
    super({
      selector,
      openSelector,
      closeSelector,
    })
  }
  init() {
    this.$modal = $(this.config.selector)
    this.$modal.on('click', this.config.closeSelector, this._closeModal)
    this.$modal.on('click', this.config.openSelector, this._openModal)
  }
  _closeModal = e => {
    $(e.target).parents(this.selector).hide()
  }
  _openModal = e => {
    $(e.target).parents(this.selector).show()
  }
}

// initialze the application
const app = new Magna([
  // use defaults in plugin
  new Modal(),
  // use specific selector for a specific modal
  new Modal({
    selector: '.modal--login',
  }),
  route('/catalogue', [
    // only initialize inside of the catalogue module
    new Modal({
      selector: '.modal--add-to-cart',
    })
  ])
]).start()
```

This code is very abstract, it allows us to re-use it anywhere in our application that requires a Modal plugin, we 
can use the config in the `constructor` method to change the class of the modal, any value that is used inside the 
`Plugin` or just use the defaults.

So far we have been writing basic functionality without going into the details about what different types of classes 
we can use to compose our functionality, and our application has been in a single scope.
