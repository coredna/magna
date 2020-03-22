const prettify = str =>
  str
    .replace('%20', ' ')
    .replace(/([^a-z0-9]+)/gim, ' ')

export default prettify

