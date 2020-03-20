### Module
The `Module` is used to house `Plugins` or other nodes.

`Module` is different to any other type of node as it is meant to be instantiated before it is used in your 
application and the plugins attached to it.

If you needed to run a bunch of plugins for a module eg the Blog module, or a Post page you would use module to house
 all the plugins that bring life to your page

```javascript
import magna from 'magna'
import Node from 'magna/Node'
import Module from 'magna/Module'

// create your module class based on the `Module`
class Catalogue extends Module {
  init({ request }) {
    $(document.body).addClass('module--catalogue')
  }
  destroy({ request }) {
    $(document.body).removeClass('module--catalogue')
  }
}

// instantiate your instance of the module
const catalogue = new Catalogue([
  new Node()
])

magna.init([
  catalogue
])
```
