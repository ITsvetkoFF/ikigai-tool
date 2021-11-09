import { Global, Module } from '@nestjs/common';
import { knex} from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { UserModel } from './models/user.model';

const models = [UserModel];

const modelProviders = models.map(model => {
  return {
    provide: model.name,
    useValue: model
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knexObject = knex({
        client: 'pg',
        connection: process.env.DATABASE_URL,
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers()
      });

      Model.knex(knexObject);
      return knexObject;
    }
  }
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers]
})
export class DatabaseModule {}