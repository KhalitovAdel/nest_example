import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:8813'],
      queue: 'production',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservicesAsync();

  await app.listen(3022);
}
bootstrap();
