export default function trace(log) {
  return function(val) {
    return (console.log(log, val), val)
  }
}
