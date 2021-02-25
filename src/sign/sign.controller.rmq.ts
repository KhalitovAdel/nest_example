import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { SignFetchDto } from './dto/sign-create.dto';
import { ScriveService } from '../scrive/scrive.service';
import { throwError } from 'rxjs';

@Controller()
export class SignControllerRmq {
  //here we inject scrive service
  constructor(protected readonly scriveService: ScriveService) {}

  @MessagePattern('docs.fetchById')
  //Pipe may be globaly
  @UsePipes(new ValidationPipe({ transform: true, exceptionFactory: (err) => new RpcException(err) }))
  public async fetchById(@Payload() params: SignFetchDto) {
    return await this.scriveService.fetchById(params.id);
  }

  @MessagePattern('docs.fetchAll')
  public async fetchAll() {
    return await this.scriveService.fetchAllDocuments();
  }
}
