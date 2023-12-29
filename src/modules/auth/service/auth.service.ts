// auth.service.ts
import { CreateUserInput } from '@modules/user/dto/user.input';
import { UsersService } from '@modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_EXPIRE_IN, getPrivateKey, hashString } from 'src/utils/auth';
import { JWT } from '../dto/auth.dto';
import { LoginUserInput } from '../dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }


  async signup(registerInput: CreateUserInput): Promise<JWT> {
    const payload = { username: registerInput.name, email: registerInput.email };
    const userInput = {
      ...registerInput,
      password: hashString(registerInput.password),
    };
    this.usersService.create(userInput)
    const token = this.makeJwtToken(payload);
    return {
      token: token
    }
  }

  async login(loginInput: LoginUserInput) {
    const payload = { email: loginInput.email, password: loginInput.password };
    const token = this.makeJwtToken(payload)
    return {
      token: token
    }
  }
  makeJwtToken(tokenData: any) {
    return this.jwtService.sign(tokenData, {
      privateKey: getPrivateKey(),
      expiresIn: JWT_TOKEN_EXPIRE_IN,
    });
  }
}
