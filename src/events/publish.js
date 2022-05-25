const { cuidGenerator } = require('../common')

function publish ({ logger, database }) {
  return async function execute ({
    transaction = null,
    key,
    payload,
    metadata,
    topicName,
  }) {
    async function createEvent ({ databaseTransaction, id }) {
      const { Events } = database.sequelize.models

      const { dataValues } = await Events.create({
        id,
        key,
        payload,
        metadata,
        topic_name: topicName,
      }, {
        transaction: databaseTransaction,
      })

      await Events.destroy({
        where: { id },
        transaction: databaseTransaction,
      })

      return dataValues
    }

    const databaseTransaction = transaction || await database.sequelize.transaction()
    const id = cuidGenerator('ev')

    try {
      if (!transaction) {
        const event = await createEvent({
          databaseTransaction,
          id,
        })

        await databaseTransaction.commit()

        return event
      }

      return await createEvent({
        databaseTransaction: transaction,
        id,
      })
    } catch (error) {
      logger.error({
        message: 'Error sending event',
        id,
        error: error.message,
        stack: error.stack?.split('\n'),
      })

      if (!transaction) {
        await databaseTransaction.rollback()
      }

      throw error
    }
  }
}

module.exports = publish
