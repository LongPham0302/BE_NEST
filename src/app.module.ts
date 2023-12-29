import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://phamvanlong11032000:longnhi1103.@cluster0.u8jnuqr.mongodb.net/'),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
  }), UserModule, AuthModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
