.PHONY: up down logs migrate seed test lint typecheck content-validate content-sync \
        lab-postgres lab-kafka lab-aws lab-azure lab-down build

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

migrate:
	docker compose run --rm migrate pnpm db:migrate

seed:
	docker compose run --rm migrate pnpm content:sync

build:
	docker compose build

test:
	pnpm lint && pnpm typecheck && pnpm test && pnpm content:validate

lint:
	pnpm lint

typecheck:
	pnpm typecheck

content-validate:
	pnpm content:validate

content-sync:
	pnpm content:sync

lab-postgres:
	docker compose -f docker-compose.labs.yml --profile postgres up

lab-kafka:
	docker compose -f docker-compose.labs.yml --profile kafka up

lab-aws:
	docker compose -f docker-compose.labs.yml --profile aws up

lab-azure:
	docker compose -f docker-compose.labs.yml --profile azure up

lab-down:
	docker compose -f docker-compose.labs.yml down
