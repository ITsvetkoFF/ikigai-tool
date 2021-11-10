import { Knex } from 'knex';

const tableName = 'users';

export async function up(knex: Knex) {
  return knex.schema.table(tableName, t => {
    t.jsonb('log')

  });
}

export async function down(knex: Knex) {
  return knex.schema.table(tableName, t => {
    t.dropColumn('log')
  });
}