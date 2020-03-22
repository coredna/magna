export default function logAction(action, instance) {
  const magna = instance.magna
  if (magna.debug) {
    if (magna.env === 'development') {
      console.group(`%c%s %c%s`, 'color:#aaa', 'action', 'color:teal', action)
    } else if (magna.env === 'staging') {
      console.groupCollapsed(`%c%s %c%s`, 'color:#aaa', 'action', 'color:teal', action)
    }
  }
}
