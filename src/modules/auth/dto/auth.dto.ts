import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class JWT {
    @Field()
    token: string;

    @Field()
    status: number;
    
    @Field()
    userId: string;
    
}