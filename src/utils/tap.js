/**
 * tap
 * call a function with the provided argument but return the original argument
 * from the decorated function
 * @curried f -> x -> x
 * @param fn
 * @return {Function}
 */
export default function tap(fn) {
  return function(x) {
    fn.call(this, x)
    return x
  }
}
