export default (message, color, ...args) => {
  console.groupCollapsed(
    `%c ${message} `,
    `border-left:6px solid ${color};color:${color}`,
  )
  console.log(...args)
  console.groupEnd()
}
