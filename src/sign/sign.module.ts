import { Module } from '@nestjs/common';
import { SignControllerRmq } from './sign.controller.rmq';
import { ScriveModule } from '../scrive/scrive.module';
import { SignControllerRest } from './sign.controller.rest';
import { SignResolver } from './sign.resolver';

@Module({
  imports: [ScriveModule],
  providers: [SignResolver],
  controllers: [SignControllerRmq, SignControllerRest],
})
export class SignModule {}
