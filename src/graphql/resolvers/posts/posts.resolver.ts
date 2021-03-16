import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { PostResponse } from "../../types/posts/PostResponse";
import { PostsResponse } from '../../types/posts/PostsResponse';
import { isAuthenticated } from '../../../utils/token';
import { internalServerErrorMessage } from '../../../utils/internalServerErrorMessage';
import { updatePostInput } from '../../types/posts/UpdatePostInput';
import { AddCommentInput } from '../../types/posts/AddCommentInput';
import { Post } from '../../../entity/Post.entity';
import { User } from "../../../entity/User.entity";
import { Comment } from "../../../entity/Comment.entity";

@Resolver()
export class PostResolver {

    @Query(() => PostsResponse)
    async posts(): Promise<PostsResponse> {
        try {
            return { posts: await Post.find({ relations: ['comments'] }) }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Query(() => PostResponse)
    async post(
        @Arg('postId') postId: number
    ): Promise<PostResponse> {
        try {
            return { post: await Post.findOne(postId, { relations: ['comments'] }) }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Mutation(() => PostResponse)
    async createPost(
        @Arg('body') body: string,
        @Ctx() ctx: any
    ): Promise<PostResponse> {

        const { error, decodedToken } = isAuthenticated(ctx);
        if (error?.length) return { error }

        try {
            const user = await User.findOne(decodedToken.id);
            const post = await Post.create({ body, username: decodedToken.username, user }).save();
            return { post, message: 'Post Successfully created' }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Mutation(() => PostResponse)
    async updatePost(
        @Arg('updatePostInput') updatePostInput: updatePostInput,
        @Ctx() ctx: any
    ): Promise<PostResponse> {
        const { error, decodedToken } = isAuthenticated(ctx);
        const { postId, body } = updatePostInput;

        if (error?.length) return { error };

        try {
            await Post.createQueryBuilder()
                .update()
                .set({ body })
                .where('id=:id', { id: postId })
                .andWhere('userId=:userId', { userId: decodedToken.id })
                .execute();

            return { message: 'Post successfully updated' };
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Mutation(() => PostResponse)
    async deletePost(
        @Arg('postId') postId: number,
        @Ctx() ctx: any
    ): Promise<PostResponse> {

        const { error, decodedToken } = isAuthenticated(ctx);
        if (error?.length) return { error };

        try {
            await Post.createQueryBuilder()
                .delete()
                .where('id=:id', { id: postId })
                .andWhere('userId=:userId', { userId: decodedToken.id })
                .execute();

            return { message: 'Post successfully deleted' };
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Mutation(() => PostResponse)
    async addComment(
        @Arg('addCommentInput') addCommentInput: AddCommentInput,
        @Ctx() ctx: any
    ): Promise<PostResponse> {

        const { error, decodedToken } = isAuthenticated(ctx);

        if (error?.length) return { error }

        const { postId, body } = addCommentInput;

        try {

            const user = await User.findOne(decodedToken.id);
            const comment = await Comment.create({ body, postId, user }).save();

            await Post.createQueryBuilder()
                .relation(Post, 'comments')
                .of(postId)
                .add(comment);

            return { message: 'Comment Successfully added' };
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }
}