### Plugin
The `Plugin` class is where you are able to attach functionality to your page.

```javascript
import magna, { Plugin } from '@coredna/magna'
import $ from 'jquery'

class MyPlugin extends Plugin {
  init({ request }) {
    this.$elem = $(this.config.selector).on('click', this._handleClick)    
  }
  destroy({ request }) {
    this.$elem.off('click')
  }
  _handleClick = e => {
    console.log('clicked element', e)
  }
}
magna.init([
  new MyPlugin({ selector: '#my-element' }),
])
```
