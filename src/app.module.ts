import { Module } from '@nestjs/common';
import { SignModule } from './sign/sign.module';
import { ScriveModule } from './scrive/scrive.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  //We import all modules to make it singleton https://docs.nestjs.com/fundamentals/injection-scopes
  imports: [SignModule, ScriveModule, GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' })],
})
export class AppModule {}
