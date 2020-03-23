### Predicate
The `Predicate` class gives you the ability to let the system decide if the node tree should execute, an example of 
this is the `route` method that we have seen. A predicate takes a function as an argument, if it returns true the 
subtree will be executed if it returns false it will trigger a destroy signal down the tree.

```javascript
import Magna, { Predicate } from '@coredna/magna'
import $ from 'jquery'

class HasElement extends Predicate {
  predicate() {
    return $(this.config.selector).length
  }
}

new Magna([
  new HasElement({ selector: '#my-element' }, [
    new Node() 
  ])
]).start()
```

the `route` function is built exactly like this, but has been abstracted because it so used and so useful, and this 
will help in understanding the code
```javascript
import Magna from '@coredna/magna'
import HasElement from './HasElement'

const hasElement = (selector, nodes) => new HasElement({ selector }, nodes)

new Magna([
  hasElement('#my-element', [
    new Node() 
  ])
]).start()
```
