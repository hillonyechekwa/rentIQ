import type {User, UserObject} from 'next-auth'


declare module "next-auth" {
    //user information to be extracted from the backend.

    export interface UserObject {
        id: number;
        username: string;
        email: string;
    }

//   refresh call token

    export interface BackendAccessJWT {
        accessToken: string;
    }


    export interface BackendJWT extends BackendAccessJWT {
        refreshToken: string;
    }


    export interface DecodedJWT extends UserObject {
        token_type: "refresh" | "access";
        exp: number; //token expiry date
        iat: number; //token issuance time.
        jti: string; //token id
    }



    export interface User {
        tokens: BackendJWT;
        user: UserObject;
        validity: AuthValidity;
    }


    export interface Session {
        user: UserObject;
        validity: AuthValidity;
        error: "RefreshTokenExpired" | "RefreshAccessTokenError";
    }
}


declare module "next-auth/jwt" {
    export interface JWT{
        data: User;
        error: "RefreshTokenExpired" | "RefreshAccessTokenError";
    }
}