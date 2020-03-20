import magna from '../'
import qs from 'qs'

export function log(message, color, id, ...args) {
  console.groupCollapsed(
    `%c ${message} `,
    `border-left:6px solid ${color};color:${color}`,
    id,
  )
  console.log(...args)
  console.groupEnd()
}

export function radioClass(classes, el) {
  return function(clazz) {
    el = document.querySelector(el)
    classes.forEach(x => el.classList.remove(x))
    el.classList.add(clazz)
  }
}

export function nullObject(...objects) {
  return Object.assign(Object.create(null), ...objects)
}

export function chain(target) {
  Object.getOwnPropertyNames(target.prototype).forEach(key => {
    if (typeof target.prototype[key] === 'function') {
      const origMethod = target.prototype[key]
      target.prototype[key] = function() {
        const result = origMethod.apply(this, arguments)
        return typeof result !== 'undefined'
          ? result
          : this
      }
    }
  })
}

export function trace(log) {
  return function(val) {
    return (console.log(log, val), val)
  }
}

export function ensurePromise(result) {
    if (result instanceof Promise) {
      return result
    }
    if (Array.isArray(result)) {
      return Promise.all(result)
    }
    return Promise.resolve(
      result
    )
  }

export function minimumLetters(count, string) {
  return string + ' '.repeat((count - string.length) > 0 ? count - string.length : 0)
}

export function logRoute(method) {
  if (magna.debug) {
    if (magna.env === 'development') {
      console.group(`%c%s %c%s %c%s %c%s`,
        'color:#aaa', 'route',
        'color:purple', method,
        'color:#111', location.pathname,
        'color:#007bff;font-weight:normal', magna.request.type
      )
    } else if (magna.env === 'staging') {
      console.groupCollapsed(`%c%s %c%s %c%s %c%s`,
        'color:#aaa', 'route',
        'color:purple', method,
        'color:#111', location.pathname,
        'color:#007bff;font-weight:normal', magna.request.type
      )
    }
  }
}

export function logAction(action) {
  if (magna.debug) {
    if (magna.env === 'development') {
      console.group(`%c%s %c%s`, 'color:#aaa', 'action', 'color:teal', action)
    } else if (magna.env === 'staging') {
      console.groupCollapsed(`%c%s %c%s`, 'color:#aaa', 'action', 'color:teal', action)
    }
  }
}

/**
 * tap
 * call a function with the provided argument but return the original argument
 * from the decorated function
 * @curried f -> x -> x
 * @param fn
 * @return {Function}
 */
export function tap(fn) {
  return function(x) {
    fn.call(this, x)
    return x
  }
}

export function apply(fn) {
  const _this = this
  return function(...args) {
    return fn.apply(_this, ...args)
  }
}

/**
 * constant
 * Always return the same value from the curried function
 * @param x
 * @return {Function}
 */
export const constant = x => () => x

export const pathOr = (keys, or, obj) =>
  keys.reduce((acc, x) =>
    typeof(acc[x]) !== 'undefined'
      ? acc[x]
      : or
    , obj)

export const path = (keys, obj) => pathOr(keys, '', obj)

export const prettify = str => str.replace('%20', ' ').replace(/([^a-z0-9]+)/gim, ' ')
export const uglify = str => str.toLowerCase().replace(/([^a-z0-9]+)/gim, '-')

export const asyncForEach = (promises, resolver) =>
  Promise.all(
    promises.map(
      (promise, index, promises) => promises.slice(0, index + 1).reduce(
        (chain, promise) => chain.then(() => promise)
      )
    ).map((promise, i) => promise.then(
      Array.isArray(resolver)
        ? resolver[i]
        : resolver
    ))
  )

export const combineUrlParams = (url, params) => {
  const queryIndex = url.indexOf('?')
  if (queryIndex > -1) {
    const urlSlug = url.slice(0, queryIndex)
    const urlParams = qs.parse(url.slice(queryIndex))
    const newQueryParams = qs.stringify({
      ...urlParams,
      ...params
    }, {
      encode: false,
      arrayFormat: 'brackets',
    })
    console.log({ urlSlug, urlParams, newQueryParams })
    return urlSlug + ((newQueryParams.length) ? '?' + newQueryParams : '')
  }
  if (typeof params !== 'undefined' && Object.getOwnPropertyNames(params).length) {
    return url + '?' + qs.stringify(params, { encode: false, arrayFormat: 'brackets'})
  }
  return url
}

// debounce event so it only fires if the event was not fired until the timeout period has expired
export const debounce = (timeout, callback) => {
  let timer = null
  return function(e) {
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(this, args)
    }, timeout)
  }
}