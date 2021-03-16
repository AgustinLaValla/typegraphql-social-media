import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserResponse } from "../../types/auth/UserResponse";
import { RegisterInput } from "../../types/auth/RegisterInput";
import { LoginInput } from "../../types/auth/LoginInput";
import { registerInputValidator } from '../../../utils/registerInputValidator';
import { loginInputValidator } from '../../../utils/loginInputValidator';
import { customErrorMessage } from '../../../utils/customErrorMessage';
import { internalServerErrorMessage } from '../../../utils/internalServerErrorMessage';
import { toTitleCase } from '../../../utils/toTitleClase';
import { generateToken } from '../../../utils/token';
import { User } from "../../../entity/User.entity";

@Resolver()
export class AuthResolver {

    @Query(() => String)
    async helloWorld(): Promise<string> {
        return 'Hello World'
    }

    @Mutation(() => UserResponse)
    async register(@Arg('registerInput') registerInput: RegisterInput): Promise<UserResponse> {
        const errors = registerInputValidator(registerInput);
        if (errors.length) return { error: errors };

        const { username, email, password } = registerInput;

        try {
            const emailExists = await User.findOne({ where: { email: email.toLowerCase() } });
            if (emailExists) return { error: customErrorMessage('Email is taken') }


            const user = await User.create({ username: toTitleCase(username), email: email.toLowerCase(), password });
            await user.hashPassword();
            user.save();

            const payload = {
                id: user.id,
                username: toTitleCase(username),
                email: email.toLowerCase(),
                createdAt: user.createdAt
            }

            const token = await generateToken(payload);

            return { user, token }

        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Mutation(() => UserResponse)
    async login(@Arg('loginInput') loginInput: LoginInput): Promise<UserResponse> {
        const errors = loginInputValidator(loginInput);
        if (errors.length) return { error: errors };

        const { email, password } = loginInput;

        try {
            const user = await User.findOne({ where: { email: email.toLowerCase() } });
            if (!user) return { error: customErrorMessage('User not Found') };

            const isValid = user.validatePassword(password);
            if (!isValid) return { error: customErrorMessage('User or password is wrong') };

            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            }

            const token = await generateToken(payload);

            return { user, token }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }
}