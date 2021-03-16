import { Field, Int, ObjectType } from "type-graphql";
import { ErrorResponse } from "../ErrorResponse";

@ObjectType()
export class DecodedToken {
    @Field(() => String, { nullable: false })
    id!: number;

    @Field(() => String, { nullable: false })
    username!: string;

    @Field(() => String, { nullable: false })
    email!: string;

    @Field(() => Date, { nullable: true })
    createdAt?: Date | string;

    @Field(() => Int, { nullable: true })
    iat?: number;

    @Field(() => Int, { nullable: false })
    exp!: number;
}

@ObjectType()
export class AuthResponse {
    @Field(() => DecodedToken, { nullable: true })
    decodedToken?: DecodedToken;

    @Field(() => [ErrorResponse], { nullable: true })
    error?: ErrorResponse[];
}