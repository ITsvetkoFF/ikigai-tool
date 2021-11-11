import 'dotenv/config';

import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  },
  migrations: {
    directory: './src/database/migrations',
    stub: './src/database/migration.stub',
  },
  seeds: {
    directory: './src/database/seeds',
    stub: './src/database/seed.stub'
  },
  ...knexSnakeCaseMappers()
} as Knex.Config;