const config = require('../../config')
const logger = require('../logger')

const makeKafka = require('./kafka')
const schemaRegistry = require('./schema-registry')

const kafka = makeKafka({ config, logger })

module.exports = {
  schemaRegistry: schemaRegistry({ config, logger }),
  kafka,
}
