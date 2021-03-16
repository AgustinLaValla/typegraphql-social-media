import { Field, InputType, Int } from "type-graphql";

@InputType()
export class updatePostInput {
    @Field(() => String)
    body!: string;
    
    @Field(() => Int)
    postId!: number;
}