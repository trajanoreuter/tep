setup-app:
	@docker-compose up --build tep
.PHONY: setup-app

database:
	@docker-compose up -d postgres
	@sleep 3
.PHONY: database

migrate:
	@docker-compose run --rm tep npm run migrate
.PHONY: migrate

setup-db: database migrate
.PHONY: setup-db

setup-kafka-ecosystem:
	@docker-compose up -d zookeeper broker schema-registry connect akhq
.PHONY: setup-kafka-ecosystem

setup-connectors:
	./scripts/connectors/debezium-events.sh
.PHONY: setup-connectors

setup-all: setup-db setup-kafka-ecosystem setup-connectors setup-app
.PHONY: setup-all

populate-tables:
	@docker-compose run --rm tep npm run script
.PHONY: populate-tables

psql:
	@docker-compose exec postgres psql user=postgres
.PHONY: psql

sqlserver:
	@docker exec -it sqlserver bash -c '/opt/mssql-tools/bin/sqlcmd -U sa -P P@ssw0rd'
.PHONY: sqlserver

stop:
	@docker-compose stop
.PHONY: stop

down:
	@docker-compose down
.PHONY: down

purge-all:
	@docker ps -aq | xargs docker stop
	@docker ps -aq | xargs docker rm
	@docker images -q | xargs docker rmi
.PHONY: purge-all

logs:
	@docker-compose logs -f tep
.PHONY: logs
