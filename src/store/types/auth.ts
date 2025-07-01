export interface AuthState {
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

export interface GuestLoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        exp: number;
        name: string;
    }
}