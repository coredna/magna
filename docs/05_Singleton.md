### Singleton
The `Singleton` is a `Plugin` that will never be destroyed or re-initialized after it has been loaded. This 
example plugin will only be bound to your page once, and will never be destroyed if you change the page.

```javascript
import Magna, { Singleton } from '@coredna/magna'
import $ from 'jquery'

class MySingleton extends Singleton {
  init({ request }) {
    this.$elem = $(this.config.selector).on('click', this._handleClick)
  }
  _handleClick = e => {
    console.log('clicked element', e)
  }
}
new Magna([
  new MySingleton({ selector: '#my-element' }),
]).start()
```
