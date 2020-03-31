### ExtendablePlugin
The `ExtendablePlugin` class is similar to the `Plugin` node, however, it can be used as either a standard plugin using a configuration object on instantiation, or you can extend it and use class properties and methods in their place.

For a standard plugin you can do the following
```javascript
import Magna, { ExtendablePlugin } from '@coredna/magna'
import $ from 'jquery'

class MyPlugin extends ExtendablePlugin {
  
  static defaultConfig = {
    myConfigProp: 'default-value',
    myConfigFunction: () => 'default-function-value',
  } 
  
  init({ request, config }) {
    // in your plugin you should use the instance property, not the config property to consistently use the same property
    // good
    console.log(this.myConfigProperty)
    console.log(this.myConfigFunction())
    // bad!
    console.log(config.myConfigProperty)
    console.log(config.myConfigFunction())
    console.log(this.config.myConfigProperty)
    console.log(this.config.myConfigFunction())
  } 
}
```

You can extend your plugin, but use properties on your class in place of options
```javascript
class MyExtendedPlugin extends MyPlugin {
  myConfigProp = 'extended-value'
  myConfigFunction = () => 'extended-function-value'
}
```

When you instantiate your plugin you are still able to overwrite the defaults using the config object
```javascript
const app = new Magna([
  new MyPlugin(), // use the defaults
  new MyPlugin({ myConfigProp: '#my-element' }), // use the config object
  new MyExtendedPlugin({ myConfigProp: '#my-element' }), // use the config object
  new MyExtendedPlugin(), // use the defaults
]).start()
```

