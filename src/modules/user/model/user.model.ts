import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaxLength } from 'class-validator';
import { Document, Schema as MongoSchema } from 'mongoose';

@ObjectType()
@Schema()
export class User {
    @Field((type) => ID)
    _id: string;

    @Field(() => String)
    @Prop(String)
    name: string;

    @Field(() => String)
    @Prop(String)
    email: string;

    @Field(() => String)
    @Prop(String)
    password: string;

    @Field({ nullable: true })
    @Prop()
    @MaxLength(128)
    description: string;

    @Field()
    @Prop(String)
    avatarExternalUrl?: string;

    @Field()
    @Prop(String)
    dateOfBirth: string;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);