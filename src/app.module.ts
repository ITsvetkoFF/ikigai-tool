import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./user/user.module";

@Module({
      imports: [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '../..', 'public'),
        }),
        DatabaseModule,
        UsersModule
      ]
})
export class AppModule {}
