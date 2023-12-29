import * as fs from 'fs';
import * as bcrypt from 'bcrypt';


export const pathToKeys = 'assets/jwtRS256.key';
export function getPrivateKey() {
    return "A1B2C3D4E5F6G7H8I9J0";
}

export const JWT_TOKEN_EXPIRE_IN = '24h';

export const hashString = (
    string: string,
    saltRounds = 10,
): string => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(string, salt);
};

export const comparePassword = (
    password: string,
    hashedPassword: string,
): boolean => {
    return bcrypt.compareSync(password, hashedPassword);
};