import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field()
    email: string;

    @Field()
    name: string;

    @Field()
    password: string;

    @Field()
    description: string;

    @Field()
    avatarExternalUrl: String;

    @Field()
    dateOfBirth: string;
}

@InputType()
export class UpdateUserInput {
    @Field(() => ID)
    _id: string;

    @Field(() => String)
    name: string;

    @Field()
    description: string;

    @Field()
    avatarExternalUrl: String;

    @Field()
    dateOfBirth: string;
}