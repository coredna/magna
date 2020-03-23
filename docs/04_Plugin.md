### Plugin
The `Plugin` class is where you are able to attach functionality to your page.

```javascript
import Magna, { Plugin } from '@coredna/magna'
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
const app = new Magna([
  new MyPlugin({ selector: '#my-element' }),
]).start()
```
