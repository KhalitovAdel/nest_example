import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignModel {
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  name: string;
}
