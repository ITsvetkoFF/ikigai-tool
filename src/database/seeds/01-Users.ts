import { Knex } from 'knex';
import { UserModel } from '../models/user.model';

export async function seed(knex: Knex): Promise<any> {
  await UserModel.query(knex).insert([
    {name: "Yarik"},
    {name: "Yorik"}
  ]);
}