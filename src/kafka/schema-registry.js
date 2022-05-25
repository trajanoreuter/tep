const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry')

function SchemaRegistryFactory ({ config, logger }) {
  try {
    const { host } = config.schemaRegistry

    return new SchemaRegistry({ host })
  } catch (error) {
    logger.error({
      message: 'Cannot instance schema registry',
      error: error.message,
      stack: error.stack ? error.stack.split('\n') : null,
    })

    throw error
  }
}

module.exports = SchemaRegistryFactory
