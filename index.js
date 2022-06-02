const logger = require('./src/logger')
const { postgres } = require('./src/database')

async function main () {
  try {
    const { Events } = postgres.sequelize.models

    const { dataValues: event } = await Events.create({
      key: '12345',
      payload: {
        test: 'field',
      },
      metadata: {},
      topic_name: 'topic.test',
    })

    logger.info({
      message: 'Created',
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
