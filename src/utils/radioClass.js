export default function radioClass(classes, el) {
  return function _radioClass(clazz) {
    el = document.querySelector(el)
    classes.forEach(x => el.classList.remove(x))
    el.classList.add(clazz)
  }
}
