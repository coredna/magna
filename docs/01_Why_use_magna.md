# Why use Magna

If you want to be able to share javascript between projects, Magna's plugin system through npm makes it easy.

If you find that your code often restricts your functionality and initialization inside a specific URL, then Magna
can help you to effectively manage your code initialization.

If you want the fastest load times possible, Magna's bundling can reduce the code you need to ship every page.

If you want to reduce the amount of bugs in your code, reduce your codebase or separate your code in to easy to 
manage modules, Magna can improve your code.

Here is a simple example of what can be achieved using Magna.

```javascript
import magna, { route } from '@coredna/magna'

import MobileNavigation from './plugins/MobileNavigation'

import HomePage from './page/HomePage'
import Blog from './blog/Blog'
import Catalogue from './catalogue/Catalogue'

magna.init(
  new MobileNavigation(),
  route('/', [
    new HomePage([
      new Slider({ selector: '.slider--main' }),
      new Slider({ selector: '.slider--products' }),
    ])
  ]),
  route('/blogs', [
    new Blog([
      new CommentForm()
    ])
  ]),
  route('/catalogue', [
    new Catalogue([
      new FacetedSearch()
    ])
  ])
)
```

Magna makes understanding your code easy at a very high level. In this code I can see that there is some mobile 
navigation and three routes with three modules. The Homepage has 2 sliders, the blog module has some sort of comment 
form and the catalogue has a faceted search. Even with how easy this code is to understand later we will see how we 
can make it even better, we can even implement a full single page experience.

The equivalent code in basic javascript would look something like.

```javascript
const mobileNavigation = new MobileNavigation()

let homepage
let blog
let catalogue

mobileNavigation.init()
if (window.location.href === '/') {
  homepage = new HomePage()
  homepage.init()
  homepage.initMainSlider()
  homepage.initProductSlider()
}
else if (window.location.href.match(/^\/blogs/)) {
  blog = new Blog()
  blog.init()
  blog.initCommentForm()
}
else if (window.location.href.match(/^\/catalogue/)) {
  catalogue = new Catalogue()
  catalogue.init()
  catalogue.initFacetedSearch()
}
```

While this example is trivial, well formatted, using modern javascript and fairly well organized but it still has a 
bunch of issues that will make it harder to maintain:
* The code is imperative. We are writing the steps to complete an action rather than describing what it should do 
* Plugins for HomePage, Blog & Catalogue are probably defined in the global namespace 
* Variables are saved in the global namespace which can lead to hard to find bugs and increase the cognitive load of 
 managing your code
* Plugins are tied to their module, so the code can't be shared between different parts of the application
* Over time this code will become less structured as new features are added and more developers work on it
* Your bundle will be large as you need to ship the entire codebase on every request

Even with all the problems above, the javascript your working on probably looks more like this

```javascript
var $facetedSearch = $('#facetedSearch')
var $commentForm = $('#comment_form')
var $sliderMain = $('.slider--main')
var $productSlider = $('.slider--product')
var $navigation = $('.navigation--mobile')

$navigation.someNavigationPlugin()

if (window.location.href === '/') {
  $sliderMain.sliderPlugin({ /* config */ })
  $productSlider.sliderPlugin({ /* config */ })
}
else if (window.location.href.match(/^\/blogs/)) {
  $commentForm.submit(function(e) {
    $.post(e.target.action, $(e.target).serialize(), null, 'json')
      .then(function(response) {
        console.log('submitted comment', response)
      })
  })
}
else if (window.location.href.match(/^\/catalogue/)) {
  $facetedSearch.on('click', '.facet__item', function(e) {
    $.post(e.target.action + '?' + $.param({
      action: 'prodcatalogue',
      form_name: 'faceted_search',
      form_action: 'search'
    }), $(e.target).serialize(), null, 'json')
      .then(function(response) {
        console.log('faceted search updated', response)
      })
  })
}
```

This code is well formatted for jQuery, it's separating the functionality based on the URL, it only does what it's 
supposed to do but it's unmaintainable, it's hard to reason about, hard to know what code is being used. We can assume
that there is a lot more code in this single file making it even harder to manage.

| Pros  | cons  |
|-------|-------|
| Anyone can write it with a little jQuery knowledge | see the rest of the cons |
| It's fast to write | It's hard to understand |
| Global variables for application state | Application state can be overwritten anywhere in the application |
| Global variables for jQuery objects | It's hard to know where the variables are used |
| Code only executes based on url | With lots of code it's hard to see where these if statements are, and it's likely that the next developer or support person will not respect these rules |
| We can see exactly how our code is applied to the webpage | It's hard to reason about our code an a high level |
| Ajax query's show how the query is made | We might lose consistency between requests, making it harder to manage |
| Code is customized for each purpose | We need to repeat code that could be made more abstract and shared |
| All code is available at all times in all scopes | We have to ship our entire codebase for every page. |

For me there isn't a single pro that outweighs the cons, maybe as the developer responsible for meeting deadlines you 
could argue that being fast to write will make you meet that deadline, but at the cost of every other developer that 
has to maintain your code including you when you need to make a change.

Using Magna will not reduce the amount of code that needs to run, but it will increase the ability to share your 
code, it will let you see how your application is structured at a very high level and know exactly the file that your
code executes in, in that file you will know all it's dependencies, it will let you easily share code between projects &
to use distributable plugins that can be managed through npm or git sub tree.
