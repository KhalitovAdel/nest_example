import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SignModule } from './sign.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

describe('Sign controller', () => {
  let app: INestApplication, client: ClientProxy;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SignModule,
        //creating client to send any message
        ClientsModule.register([
          {
            name: 'HEARTBEAT_SERVICE',
            transport: Transport.RMQ,
            options: {
              noAck: true,
              urls: ['amqp://localhost:8813'],
              queue: 'test',
              queueOptions: { durable: true },
            },
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        noAck: true,
        urls: ['amqp://localhost:8813'],
        queue: 'test',
        queueOptions: { durable: true },
      },
    });
    await app.startAllMicroservicesAsync();
    await app.init();
    client = app.get('HEARTBEAT_SERVICE');
  });

  describe('Should RMQ work', () => {
    it('should fetchAll work', async () => {
      const result = await client.send('docs.fetchAll', {}).toPromise();
      expect(!!result.length).toBe(true);
    });

    it('should fetchById throw validation error (id required)', async () => {
      expect(client.send('docs.fetchById', {}).toPromise()).rejects.toThrow();
    });

    it('should fetchById work', async () => {
      const result = await client.send('docs.fetchById', { id: 1 }).toPromise();
      expect(result.id).toBe(1);
    });
  });
});
