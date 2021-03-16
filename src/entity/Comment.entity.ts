import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post.entity";
import { User } from './User.entity';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ type: 'text', nullable: false })
    body!: string;

    @Column()
    postId: number

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'postId' })
    post: Post;

    @Field(() => User)
    @ManyToOne(() => User)
    user!: User

    @Field(() => Date)
    @CreateDateColumn({ nullable: true })
    createdAt?: Date
}