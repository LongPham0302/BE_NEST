// auth.resolver.ts
import { JWT } from '@modules/auth/dto/auth.dto';
import { CreateUserInput } from '@modules/user/dto/user.input';
import { User } from '@modules/user/model/user.model';
import { UsersService } from '@modules/user/services/user.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StatusCodes } from 'src/bases/base.interfaces';
import { comparePassword } from 'src/utils/auth';
import { UserError } from 'src/utils/error';
import { convertToLowerCase } from 'src/utils/stringultils';
import { isValidBase64, validateDateOfBirth, validateDescription, validateEmail, validateName, validatePassword } from 'src/utils/validation';
import { LoginUserInput } from '../dto/auth.input';
import { AuthService } from '../service/auth.service';

@Resolver('Auth')
export class AuthResolver {
    constructor(private authService: AuthService,
        private readonly userService: UsersService,
    ) { }

    @Mutation(() => JWT)
    async signup(@Args('registerInput') registerInput: CreateUserInput) {
        const { dateOfBirth, email, name, password, avatarExternalUrl, description } = registerInput;
        if (!validateEmail(email)) {
            throw new UserError(
                'Field invalidate',
                StatusCodes.EMAIL_INVALIDATE,
            );
        }
        if (!validatePassword(password)) {
            throw new UserError(
                'Field password invalidate',
                StatusCodes.FIELD_INVALIDATE,
            );
        }
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
        const user = await this.userService.findUserByEmail(registerInput.email)
        if (user) {
            throw new UserError(
                'duplicate emails',
                StatusCodes.EMAIL_ALREADY_EXISTS,
            );
        }
        return this.authService.signup(registerInput);
    }

    @Mutation(() => JWT)
    async login(
        @Args('loginInput') loginInput: LoginUserInput,
    ): Promise<JWT> {
        const { password } = loginInput;
        const email = convertToLowerCase(loginInput.email);

        if (!validateEmail(email)) {
            throw new UserError('Email invalid!', StatusCodes.EMAIL_INVALIDATE);
        }

        let user: User = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UserError('User not found', StatusCodes.USER_NOT_FOUND);
        }

        if (!comparePassword(password, user.password))
            throw new UserError('Password is invalid!', StatusCodes.INVALID_PASSWORD);

        return this.authService.login(loginInput,user._id);
    }

}
