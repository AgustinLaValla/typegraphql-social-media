import { ErrorResponse } from "../graphql/types/ErrorResponse";
import { RegisterInput } from "../graphql/types/auth/RegisterInput";

export function registerInputValidator(registerInput: RegisterInput): ErrorResponse[] {
    const { username, email, password } = registerInput;
    let errors: ErrorResponse[] = [];

    if (!username) {
        errors.push({ message: 'Username is required', status: 400 });
    }

    if (!email) {
        errors.push({ message: 'Email is required', status: 400 });
    }

    if (!password) {
        errors.push({ message: 'Password is required', status: 400 });
    }

    return errors;
}