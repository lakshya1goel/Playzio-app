export interface AuthState {
    user_id: number | null;
    name: string;
    email: string | null;
    profile_pic: string | null;
    access_token: string | null;
    refresh_token: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isLoggedIn: boolean;
}

export interface GoogleLoginResponse {
    success: boolean;
    message: string;
    data: User;
}

export interface GuestLoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        exp: number;
        name: string;
    }
}

export interface User {
    id: number;
    name: string;
    email: string;
    profile_pic: string;
    access_token: string;
    access_token_exp: number;
    refresh_token: string;
    refresh_token_exp: number;
}

export interface GetAccessTokenFromRefreshTokenResponse {
    success: boolean;
    message: string;
    data: {
        access_token: string;
        access_token_exp: number;
    }
}