/**
 * pad
 *
 * Add string padding to unsure it uses a {count} amount of characters
 *
 * @param {int}  count  length of output string
 * @param {String}  string
 * @param {String}  char  character or string to pad the end of the string with
 * @returns {string}
 */
export default function pad(count, string, char = ' ') {
  return string + char.repeat((count - string.length) > 0 ? count - string.length : 0)
}
