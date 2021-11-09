import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {INestApplication} from "@nestjs/common";

export function registerGlobals(app: INestApplication) {
  app.setGlobalPrefix('api/v1');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  registerGlobals(app);
  await app.listen(3000);
}
bootstrap();
