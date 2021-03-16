import { ErrorResponse } from "../graphql/types/ErrorResponse";
import { LoginInput } from "../graphql/types/auth/LoginInput";

export function loginInputValidator(loginInput: LoginInput): ErrorResponse[] {
    let errors: ErrorResponse[] = [];
    const { email, password } = loginInput;

    if (!email) {
        errors.push({ status: 400, message: 'Email is required' })
    }

    if (!password) {
        errors.push({ status: 400, message: 'Password is required' })
    }

    return errors;
}