# Changelog

`v1.0.0`
published framework

`v2.0.0`
* Add rollup to package for commonjs, esm and umd
* Move sourcecode into `/src` folder
* Add all magna types, predicates and utils to root import
* Remove jQuery dependency
* Replace [ramda](https://github.com/ramda/ramda) with [rambda](https://github.com/selfrefactor/rambda)
* Use only [query-string](https://github.com/sindresorhus/query-string) dependency
* Remove `matchHref` use only `route`
* Moved all utils to individual files `src/utils/*.js`
* `index.js` files for every folder `src/(types|predicates|types)/index.js`
* Add `config` to `init`, `destroy` & `popstate` methods. `init({ request, config })`
* Update license to correct version [MIT](http://opensource.org/licenses/MIT)

`v2.1.0`
* Removed global singleton `magna` instance, users need to create their own instance now
* default export from `@coredna/magna` is now the `Magna` constructor
* All nodes now have access to their root node through `node.magna`
* Fixed bug with `Import` not passing itself to child `Module`
* Added jest for testing
* Documentation updated with new API

`v2.1.1`
* Decoupled request from application so it can be mocked and there is a single source of truth for the current state.
* Changed Request api to be more consistent with the history api
* Added `query` property to Request to hold get params from the current request
* Bugfix: Remove location.origin from href
* Request testing added
* Removed `Magna.getHistory`, removed scoped state

`v2.2.0`
* Added new `State` and `StateObserver` classes for managing local state 
* Added `escapeRegexCharacters`

`v2.3.0`
* Added new Node `ExtendablePlugin` see [ExtendablePlugin](./docs/13_ExtendablePlugin.md)
* Changed developer console log to use `[Symbol.toStringTag]` so non minified name is preferred when code is minified
