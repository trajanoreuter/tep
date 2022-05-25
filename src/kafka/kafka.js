const { Kafka } = require('kafkajs')

function kafka ({ config, logger }) {
  try {
    const ssl = config.kafka.ssl ? { ssl: config.kafka.ssl } : {}

    const endpoints = config.kafka.endpoints.split(',')

    const {
      maxRetryTime,
      initialRetryTime,
      retries,
    } = config.kafka

    return new Kafka({
      brokers: endpoints,
      ...ssl,
      retry: {
        maxRetryTime,
        initialRetryTime,
        retries,
      },
    })
  } catch (error) {
    logger.error({
      message: 'Cannot instance kafka',
      error: error.message,
      stack: error.stack ? error.stack.split('\n') : null,
    })

    throw error
  }
}

module.exports = kafka
