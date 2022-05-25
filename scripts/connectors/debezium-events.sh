#!/bin/bash

status=000

configureDebezium () {
  response_code=$(curl --write-out '%{http_code}' --silent --output /dev/null -XPOST localhost:8083/connectors/ -H "content-type: application/json" -d '
    {
      "name": "postgres.debezium-events",
      "config": {
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "tasks.max": "1",
        "database.hostname": "postgres",
        "plugin.name": "pgoutput",
        "database.port": "5432",
        "database.user": "postgres",
        "database.password": "postgres",
        "database.dbname": "postgres",
        "database.server.name": "postgres",
        "table.include.list": "public.Events",
        "database.history.kafka.bootstrap.servers": "http://broker:9092",
        "database.history.kafka.topic": "schema.changes.postgres.cdc",
        "slot.name": "debezium_events",
        "max.queue.size": "81290",
        "max.batch.size": "20480",
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "value.converter": "io.debezium.converters.ByteBufferConverter",
        "value.converter.delegate.converter.type": "org.apache.kafka.connect.json.JsonConverter",
        "value.converter.delegate.converter.type.schemas.enable": "false",
        "snapshot.mode": "never",
        "publication.name": "dbz_events",
        "transforms": "outbox",
        "transforms.outbox.table.field.event.key": "key",
        "transforms.outbox.route.by.field": "topic_name",
        "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
        "transforms.outbox.route.topic.replacement": "${routedByValue}",
        "transforms.outbox.table.fields.additional.placement": "metadata:header",
        "topic.creation.default.cleanup.policy": "delete",
        "topic.creation.default.replication.factor": "1",
        "topic.creation.default.partitions": "1",
        "key.converter.schemas.enable": "false",
        "value.converter.schemas.enable": "false",
        "heartbeat.interval.ms": "3000"
      }
    }
  ');

  echo "$response_code"
}

while [ "$status" != 201 ] | [ "$status" != 409 ];
  do
    echo "Trying to configure debezium events"
    status=$(configureDebezium)
    sleep 5
  done

echo "debezium events configured"
