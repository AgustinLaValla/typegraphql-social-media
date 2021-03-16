import { compare, genSalt, hash } from "bcryptjs";
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => Int, { nullable: false })
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false, type: 'varchar' })
    username!: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false, type: 'varchar', unique: true })
    email!: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: false, type: 'varchar' })
    password!: string;

    @Field(() => Date, { nullable: true })
    @CreateDateColumn()
    createdAt!: Date | string;

    async hashPassword(): Promise<void> {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await compare(password, this.password);
    }
}