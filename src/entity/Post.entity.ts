import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from './Comment.entity';
import { User } from "./User.entity";

@Entity()
@ObjectType()
export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: 'text', nullable: false })
    body!: string;

    @Column()
    userId: number

    @Field(() => User)
    @JoinColumn({ name: 'userId' })
    @ManyToOne(() => User)
    user: User;

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false })
    username!: string;

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.post, { eager: true })
    comments?: Comment[];


    @Field(() => Date)
    @CreateDateColumn({ nullable: true })
    createdAt?: Date
}