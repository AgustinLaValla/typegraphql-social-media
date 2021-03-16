import { Field, ObjectType } from 'type-graphql';
import { Post } from '../../../entity/Post.entity';
import { ErrorResponse } from '../ErrorResponse';

@ObjectType()
export class PostResponse {
    @Field(() => Post, { nullable: true })
    post?: Post;

    @Field(() => [ErrorResponse], { nullable: true })
    error?: ErrorResponse[];

    @Field(() => String, { nullable: true })
    message?: string;
}