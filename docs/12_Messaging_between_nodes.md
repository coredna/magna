# Messaging between Nodes
In a modular world we cannot use the global `window` object to save state or share information between modules. 
Magna uses a pubsub pattern to pass messages and run events between Node's.

To access the API you have three methods exposed to each Node. `subscribe`, `unsubscribe` & `trigger`.

### Subscribe
Subscribe to an event using a callback to handle the event. The event will only fire if the other Node is subscribed 
and is currently active.

```javascript
class MyPlugin extends Plugin {
  init({ request }) {
    this.subscribe('SOME_EVENT', message => {
      console.log('SOME_EVENT', message)
    })
  } 
}
```

### Unsubscribe
Unsubscribe to a subscribed event, if you specify a callback only that event will be unsubscribed, if you don't 
specify a callback all events listeners will be unset

```javascript
class MyPlugin extends Plugin {
  init({ request }) {
    this.unsubscribe('SOME_EVENT')
    this.unsubscribe('SOME_EVENT', this.onEventMessage)
  } 
}
```

### Trigger
Fire an event triggering each callback listener to the event that have been initialized.
```javascript
class MyPlugin extends Plugin {
  init({ request }) {
    this.trigger('SOME_EVENT', message)
  } 
}
```

```javascript
import Magna, { Plugin } from '@coredna/magna'
import $ from 'jquery'

class MyPlugin extends Plugin {
  constructor(options) {
    super(options)
    this.subscribe('SOME_EVENT', this.onSomeEvent)
  }
  onSomeEvent = message => {
    console.log('SOME_EVENT fired', message)
  }
}

class MyOtherPlugin extends Plugin {
  init({ request }) {
    $('.my-thing').click(this.handleClick)
  }
  handleClick = e => {
    this.trigger('SOME_EVENT', 'Hello from MyOtherPlugin!')
  }
}

new Magna([
  new MyPlugin(),
  new MyOtherPlugin(),
]).start()
```
