import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorResponse {
    @Field(() => String, { nullable: false })
    message!: string;

    @Field(() => Int, { nullable: false })
    status!: number;
}