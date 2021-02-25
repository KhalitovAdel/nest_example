import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SignFetchDto {
  @Transform(({ value }) => +value)
  @Field((type) => Int)
  @IsNumber()
  id: number;
}
