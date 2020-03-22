export default function debounce(timeout, callback) {
  let timer = null
  return function(e) {
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(this, args)
    }, timeout)
  }
}
