import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SignModule } from './sign.module';

describe('Sign controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SignModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Should REST work', () => {
    it('should fetchAll work', async () => {
      const result = await request(app.getHttpServer())
        .get('/doc')
        .then(({ body }) => body);
      expect(!!result.length).toBe(true);
    });

    it('should fetchById throw validation error (id required)', async () => {
      const result = await request(app.getHttpServer()).get('/doc/wdqw');
      expect(result.status).toBe(400);
    });

    it('should fetchById work', async () => {
      const result = await request(app.getHttpServer())
        .get('/doc/1')
        .then(({ body }) => body);
      expect(result.id).toBe(1);
    });
  });
});
