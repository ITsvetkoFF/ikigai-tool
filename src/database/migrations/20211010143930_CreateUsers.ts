import {Knex} from 'knex';

const tableName = 'users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // Adds a uuid column - this uses the built-in uuid type in PostgreSQL,
    // and falling back to a char(36) in other databases.
    // does not work in digitalocean
    // t.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary()
    t.string('id').primary()

    t.string('name').nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}