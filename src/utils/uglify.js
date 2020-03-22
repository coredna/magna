const uglify = str =>
  str
    .toLowerCase()
    .replace(/([^a-z0-9]+)/gim, '-')

export default uglify
