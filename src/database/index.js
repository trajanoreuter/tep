const config = require('../../config')
const logger = require('../logger')

const postgres = require('./postgres')

module.exports = {
  postgres: postgres({ config, logger }),
}
