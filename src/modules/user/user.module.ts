import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../user/services/user.service';
import { User, UserSchema } from './model/user.model';
import { UserMutationResolver } from './resolver/mutation.resolver';
import { UserQueriesResolver } from './resolver/queries.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UserMutationResolver,
    UserQueriesResolver,
    UsersService,
  ],
  exports: [UsersService],
})
export class UserModule {}
