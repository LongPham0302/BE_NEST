import { Module } from '@nestjs/common';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';
import { UserModule } from '@modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
        secret: 'A1B2C3D4E5F6G7H8I9J0',
        signOptions: { expiresIn: '24h' },
    }),
        UserModule, JwtModule],
    providers: [
        AuthResolver,
        AuthService
    ],
    exports: [AuthService],
})
export class AuthModule { }
