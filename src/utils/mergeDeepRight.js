const isObject = possibleObject =>
  Object.prototype.toString.call(possibleObject) === '[object Object]'

export default function mergeDeepRight(left, right) {
  const ret = {}
  for (let key in right) {
    if (Object.hasOwnProperty.call(right, key) === false) {
      continue
    }
    if (isObject(right[key])) {
      ret[key] = mergeDeepRight(left[key], right[key])
    }
    else {
      ret[key] = right[key]
    }
  }
  for (let key in left) {
    if (Object.hasOwnProperty.call(left, key) && typeof ret[key] === 'undefined') {
      ret[key] = left[key]
    }
  }
  return ret
}
