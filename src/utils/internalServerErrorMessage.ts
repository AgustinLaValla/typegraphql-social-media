import { ErrorResponse } from "../graphql/types/ErrorResponse";

export function internalServerErrorMessage(): ErrorResponse[] {
    return [{ status: 500, message: 'Internal Server Error' }];
}