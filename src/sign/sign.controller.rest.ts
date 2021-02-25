import { Controller, Get, HttpException, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScriveService } from '../scrive/scrive.service';
import { SignFetchDto } from './dto/sign-create.dto';
import { RpcException } from '@nestjs/microservices';

@Controller('doc')
export class SignControllerRest {
  //here we inject scrive service
  constructor(protected readonly scriveService: ScriveService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ exceptionFactory: (err) => new HttpException(err, 400) }))
  public async fetchById(@Param() params: SignFetchDto) {
    return await this.scriveService.fetchById(params.id);
  }

  @Get('')
  public async fetchAll() {
    return await this.scriveService.fetchAllDocuments();
  }
}
