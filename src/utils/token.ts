import { User } from "../entity/User.entity";
import { config } from 'dotenv';
import { sign, Secret, verify } from "jsonwebtoken";
import { AuthResponse, DecodedToken } from '../graphql/types/auth/AuthResponse'
import { customErrorMessage } from "./customErrorMessage";

config();

const SECRET = process.env.SECRET as Secret;

export async function generateToken(payload: Partial<User>): Promise<string> {
    return await sign(payload, SECRET, { expiresIn: '4h' });
}

export function isAuthenticated(ctx): AuthResponse {
    const bearerToken: string = ctx.req.headers.authorization;
    if (!bearerToken) {
        return { error: customErrorMessage('No Token Provided') }
    };

    const token = bearerToken.split(' ')[1];
    if(!token) return {
        error: customErrorMessage('Token Must Be Bearer Format')
    }

    const decodedToken: DecodedToken = verify(token, SECRET) as DecodedToken;

    if(decodedToken.exp * 1000 < Date.now()) {
        return { error: customErrorMessage('Token has expired. Please Login and Try Again') };
    }

    return { decodedToken }
}