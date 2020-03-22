import qs from 'query-string'

export default function combineUrlParams(url, params) {
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
