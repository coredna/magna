# Ajax
Single page applications require us to manage our memory effectively so the page doesnt slow down or crash, to help 
with this Magna gives us the ability to unbind our events, destroy any third party plugins that won't be used for 
the current url if they have been initialized.

Magna gives us methods do `destroy` and handle the `popstate` to get html from the server before running the 
`init` functions when a page changes. This section will also teach you about the structure of the Tree and let you 
use **Promises** to join new **Nodes**.

### Destroy
the `destroy` method allows us to unbind any plugins, unbind any events and generally clean up before we navigate to 
a different page in our application. Going back to our initial Modal Plugin we created in the first section we can 
modify it to be used in a single page application with just a minor change.

```javascript
import $ from 'jquery'
import Plugin from 'magna/Plugin'

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
  destroy() {
    // unbind event listeners
    this.$modal.off('click')
    // clean up any unneeded elements
    this.$modal = null
  }
}
```

The only difference is that now we have a `destroy` method to clean up our event listener and delete our local state,
it may seem like a small change but your application will thank you for freeing up memory, and it will prevent bugs 
from events being bound multiple times to the same element. `destroy` should be added to every Node in your Tree to 
make sure that across your entire application you will not be wasting unnecessary memory.

### Load html from the template between pages
Magna gives you the ability to load data from the server before executing it's `init` function by implementing the
 `popstate` and `popstatePromise` methods. And using a library provided plugin to trigger the popstate workflow.
 
#### AjaxLink
AjaxLink is a plugin that will trigger the popstate workflow throughout your application. It gives you the ability to
 specify a selector to links in your page that should be used with ajax. It will prevent the default action of the 
 links matching the selector.
 
 ```javascript
import magna from 'magna'
import AjaxLink from 'magna/AjaxLink'

magna.init([
  new AjaxLink('.ajax-link')
])
```
 
#### popstatePromise
The popstatePromise method will accept any promise that will need to be fulfilled before executing the rest of the 
tree or the `init` method handlers. The *Promise* can be from the native API, jQuery, axios or any other *thenable** 
promise based plugin.

*a **thenable** is an object that contains a `.then` method*

#### popstate
The `popstate` method is where you can handle the promise response and update the page with the new HTML that you 
requested, once popstate has been fulfilled the `init` method will be called to continue initializing your plugins as
 normal with a http load of your page.

```javascript
import magna from 'magna'
import $ from 'jquery'
import AjaxLink from 'magna/AjaxLink'
import Plugin from 'magna/Plugin'

class MyAjaxPlugin extends Plugin {
  url = '/index.php'
  params = {
    action: 'something',
    form_name: 'something',
    form_action: 'something'
  }
  popstatePromise({ request }) {
    return $.post(request.url, { 
      ...this.params, 
      ...(request.params || {}),
    }, null, 'json')
  }
  popstate({ request, response }) {
    $('.content').html(response.custom_data.html) 
  }
  init({ request }) {
     console.log('MyAjaxPlugin::init')
  }
}
magna.init([
  new AjaxLink([ '.ajax-link' ]),
  new MyAjaxPlugin()
])
```
