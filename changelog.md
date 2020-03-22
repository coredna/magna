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

