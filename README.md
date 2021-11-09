## Local database setup

Execute `npm run run:pg-docker` and create `.env` file with `DATABASE_URL=postgres://postgres:docker@localhost:5432/postgres`

Run
```bash
# create tables
npm run migrate
# populate tables
npm run seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Useful links

Knex / Objection / Postgres integration is inspired by https://www.thisdot.co/blog/reducing-mental-fatigue-nestjs-objectionjs