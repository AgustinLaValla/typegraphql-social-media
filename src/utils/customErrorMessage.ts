import { ErrorResponse } from "../graphql/types/ErrorResponse";

export function customErrorMessage(message: string, status: number = 400): ErrorResponse[] {
    return [{ message, status }];
}