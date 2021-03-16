import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AddCommentInput{
    @Field(() => String)
    body!: string;

    @Field(() => Int)
    postId!: number;
}