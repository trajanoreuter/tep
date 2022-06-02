const app = require('./app')
const logger = require('./logger')
const env = require('./env')
const database = require('./database')

const config = {
  ...env,
  database,
  app,
  logger,
}

module.exports = config
