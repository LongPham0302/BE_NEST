import { ApolloError } from 'apollo-server-express';
import { ErrorResponse } from '../bases/base.interfaces';

export class UserError extends ApolloError {
  constructor(message: string, code: string, params?: ErrorResponse) {
    super(message, code);
    Object.defineProperty(this, 'name', { value: 'UserErrors' });
  }
}