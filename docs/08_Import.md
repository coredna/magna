### Import
If you want to create separate bundles for different areas of your website you can use the `Import` plugin.

Through the magic of webpack a separate bundle will automatically be created when you use this pattern, and it will 
autoload only when you need it in your application saving you significant traffic and execution time when the page 
loads.

`Import` works by wrapping the native `import` function of node.js and webpack in a function that will only be called
 when our module should be pulled in and will only ever be called once to join the module to the application.

```javascript
import magna, { Import, route } from '@coredna/magna'

magna.init([
  route('/catalogue', [
    new Import(() => import('#catalogue'))
  ])
])
```
