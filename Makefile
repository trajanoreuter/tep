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

setup-all: setup-db setup-app
.PHONY: setup-all

psql12:
	@docker-compose exec postgres12 psql user=postgres12
.PHONY: psql12

psql14:
	@docker-compose exec postgres14 psql user=postgres14
.PHONY: psql14

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
