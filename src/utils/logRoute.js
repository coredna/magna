export default function logRoute(method, instance) {
  const magna = instance.magna
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
