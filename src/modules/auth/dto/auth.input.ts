import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginUserInput {
  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}