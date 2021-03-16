import { Field, ObjectType } from 'type-graphql';
import { Post } from '../../../entity/Post.entity';
import { ErrorResponse } from '../ErrorResponse';

@ObjectType()
export class PostsResponse {
    @Field(() => [Post], { nullable: true })
    posts?: Post[];

    @Field(() => [ErrorResponse], { nullable: true })
    error?: ErrorResponse[];
}