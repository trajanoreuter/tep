const {
  KAFKA_ENDPOINTS,
  KAFKA_SSL,
  KAFKA_MAX_RETRY_TIME,
  KAFKA_INITIAL_RETRY_TIME,
  KAFKA_RETRIES,
  KAFKA_APP_GROUP_ID,
  KAFKA_APP_SESSION_TIMEOUT,
  KAFKA_APP_REBALANCE_TIMEOUT,
  KAFKA_APP_HEARTBEAT_INTERVAL,
  KAFKA_APP_PARTITIONS_CONSUMED_CONCURRENTLY,
  KAFKA_APP_AUTO_COMMIT_INTERVAL,
  KAFKA_APP_AUTO_COMMIT_THRESHOLD,
  KAFKA_APP_USERS_TOPIC,
  KAFKA_APP_TODOS_TOPIC,
} = process.env

const ssl = KAFKA_SSL === 'true'

const kafka = {
  endpoints: KAFKA_ENDPOINTS,
  ssl,
  maxRetryTime: KAFKA_MAX_RETRY_TIME,
  initialRetryTime: KAFKA_INITIAL_RETRY_TIME,
  retries: KAFKA_RETRIES,
  app: {
    groupId: KAFKA_APP_GROUP_ID,
    sessionTimeout: KAFKA_APP_SESSION_TIMEOUT,
    rebalanceTimeout: KAFKA_APP_REBALANCE_TIMEOUT,
    heartbeatInterval: KAFKA_APP_HEARTBEAT_INTERVAL,
    partitionsConsumedConcurrently:
      KAFKA_APP_PARTITIONS_CONSUMED_CONCURRENTLY,
    autoCommitInterval: KAFKA_APP_AUTO_COMMIT_INTERVAL,
    autoCommitThreshold: KAFKA_APP_AUTO_COMMIT_THRESHOLD,
    usersTopic: KAFKA_APP_USERS_TOPIC,
    todosTopic: KAFKA_APP_TODOS_TOPIC,
  },
}

module.exports = kafka
