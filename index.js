const logger = require('./src/logger')

const events = require('./src/events')

async function main () {
  try {
    logger.info({
      message: 'Starting',
    })

    const event = await events.publish({
      key: '12345',
      payload: {
        test: 'field',
      },
      metadata: {},
      topicName: 'topic.test',
    })

    logger.info({
      message: 'Event created',
      event,
    })
  } catch (error) {
    logger.fatal({
      message: 'Unexpected application behavior',
      error: error.message,
      stack: error.stack,
    })
  }
}

main()
