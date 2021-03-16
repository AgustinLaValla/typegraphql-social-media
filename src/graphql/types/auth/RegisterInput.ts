import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field(() => String, { nullable: false })
    username!: string;

    @Field(() => String, { nullable: false })
    email!: string;

    @Field(() => String, { nullable: false })
    password!: string;
}