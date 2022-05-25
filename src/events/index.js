const { postgres } = require('../database')
const logger = require('../logger')

const publish = require('./publish')

module.exports = {
  publish: publish({
    logger,
    database: postgres,
  }),
}
