// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../model/user.model';
import { CreateUserInput, UpdateUserInput } from '../dto/user.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(CreateUserInput: CreateUserInput): Promise<User> {
    const user = await this.userModel.create(CreateUserInput);
    return user
  }

  async update(userId: string, updateUserDto: UpdateUserInput): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    return user
  }

  async getUser(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }
}
