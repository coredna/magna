export default str => {
  const index = []
  const params = {}
  const string = str instanceof RegExp ? false : str
    .replace(/\//g, '\\/')
    .replace(/\.?\*/, '.*')
    .replace(/\{([^:]+)\:?([^}]*)(\?)?\}/g, (_, param, type, skippable) => {
      index.push(param)
      params[param] = {
        type
      }
      switch (type) {
        case 'char':
        case 'alpha':
        case 'string':
          return (params[param].regex = `([a-zA-Z-_%&]${skippable ? '*' : '+'})`)
        case 'int':
        case 'num':
        case 'number':
          return (params[param].regex = `([0-9]${skippable ? '*' : '+'})`)
        default:
          if (type) {
            params[param].type = 'regex'
            return (params[param].regex = type)
          }
          params[param].type = 'mixed'
          return (params[param].regex = `([a-zA-Z0-9-_%&]${skippable ? '*' : '+'})`)
      }
    })

  return {
    params,
    string,
    index,
    regex: str instanceof RegExp ? str : new RegExp(string)
  }
}
