import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { registerGlobals } from "../src/main";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    registerGlobals(app)
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/api/')
      .expect(200)
      .expect('Hello World!');
  });
});
