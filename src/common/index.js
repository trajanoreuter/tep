const cuid = require('cuid')

function cuidGenerator (prefix) {
  if (prefix) {
    return `${prefix}_${cuid()}`
  }

  return cuid()
}

module.exports = {
  cuidGenerator,
}
