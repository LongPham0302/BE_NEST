import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { User } from "../model/user.model";
import { UsersService } from '../services/user.service';
import { UserError } from "src/utils/error";
import { StatusCodes } from "src/bases/base.interfaces";

@Resolver((of) => User)
export class UserQueriesResolver {
    constructor(
        private readonly UsersService: UsersService,
    ) { }
    @Query(() => User, { name: 'getUser' })
    async findOne(@Args('id', { type: () => ID }) id: string) {
        const user = await this.UsersService.getUser(id);
        if (!user) {
            throw new UserError('User not found', StatusCodes.USER_NOT_FOUND);
        }
        return user;
    }
}