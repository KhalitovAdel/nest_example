import { Resolver, Query, Args } from '@nestjs/graphql';
import { ScriveService } from '../scrive/scrive.service';
import { SignModel } from './model/sign.model';
import { SignFetchDto } from './dto/sign-create.dto';

@Resolver()
export class SignResolver {
  //here we inject scrive service
  constructor(protected readonly scriveService: ScriveService) {}

  @Query(() => [SignModel])
  public fetchAll() {
    return this.scriveService.fetchAllDocuments();
  }

  @Query(() => SignModel)
  public fetchById(@Args() params: SignFetchDto) {
    return this.scriveService.fetchById(params.id);
  }
}
