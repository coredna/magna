### Directory Links
In the previous example we used `import('#catalogue')` these links are not native to javascript or nodejs. Magna 
utilizes the webpacks aliases to create easy to use links in our code to find directory's rather than having to 
always use relative paths which in an application can be very long as we are using modular code.

If you look in the `.build/config/webpack.resolve.js` file you will see all the aliases that Magna uses, you can also
add your own to this file.
 
 ```javascript
const path = require('path')

module.exports = {
  alias: {
    '#javascripts': path.resolve(__dirname, '../../javascripts/src'),
    '#plugins': path.resolve(__dirname, '../../javascripts/src/plugins'),
    '#utils': path.resolve(__dirname, '../../javascripts/src/utils'),
    '#catalogue': path.resolve(__dirname, '../../modules/prodcatalogue/javascripts'),
  }
}
```

You are able to use any of these links in your application logic through imports using either the hard coded or lazy 
loading implementation. eg.

```javascript
import Catalogue from '#catalogue'
import('#javascripts/somefile').then(() => {
  console.log('module loaded')
})
```

Using these types of Nodes you should be able to compose your application that will run with http loads of the page, 
It will definitely give you the benefit of having structure to your application and only running those plugins that 
should be run, but if you want to convert your website to a single page application you can do so easily with a 
couple of new methods on `Node` and a little change to your templates
