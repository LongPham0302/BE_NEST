import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StatusCodes } from 'src/bases/base.interfaces';
import { UserError } from 'src/utils/error';
import { isValidBase64, validateDateOfBirth, validateDescription, validateEmail, validateName, validatePassword } from 'src/utils/validation';
import { CreateUserInput, UpdateUserInput } from '../dto/user.input';
import { User } from '../model/user.model';
import { UsersService } from '../services/user.service';

@Resolver(() => User)
export class UserMutationResolver {
    constructor(
        private readonly userService: UsersService,
    ) { }

    @Mutation(() => User, { name: 'createUser' })
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ) {
        return this.userService.create(createUserInput)
    }

    @Mutation(() => User, { name: 'updateUser' })
    async updateUser(
        @Args('updateUser') updateUserInput: UpdateUserInput,
    ) {
        const { _id, avatarExternalUrl, dateOfBirth, description, name } = updateUserInput
        if (!validateName(name)) {
            throw new UserError(
                'Field name invalidate',
                StatusCodes.FIELD_INVALIDATE,
            );
        }

        if (!validateDateOfBirth(dateOfBirth)) {
            throw new UserError(
                'DateOfBird invalidate',
                StatusCodes.DATE_OF_BIRD_INVALIDATE,
            );
        }

        if (!validateDescription(description)) {
            throw new UserError(
                'description invalidate',
                StatusCodes.DESCRIPTIION_INVALIDATE,
            );
        }
        if (!isValidBase64(avatarExternalUrl)) {
            throw new UserError(
                'UrlImage invalidate',
                StatusCodes.URL_INVALIDATE,
            );
        }
        return this.userService.update(_id, updateUserInput)
    }
}