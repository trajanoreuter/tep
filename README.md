# TEP
TEP with Kafka, akhq dashboard, schema registry, Debezium and Postgres

### How to run
```
make setup-all
```

### How to stop
```
make stop
```

### Access dashboard
```
localhost:8080
```

### Access Postgres
```
make psql
```

### Configure Debezium
```
make setup-connectors
```

### Configure Postgres
```
make setup-db
```

### Remove all docker images and volumes
```
make purge-all
```
