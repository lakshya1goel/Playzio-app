import api from "@/service/ApiService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AuthState, GetAccessTokenFromRefreshTokenResponse, GoogleLoginResponse, GuestLoginResponse } from "../types/auth";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const loginAsGuest = createAsyncThunk<GuestLoginResponse, string, { rejectValue: string }>(
    'auth/loginAsGuest',
    async (name, { rejectWithValue }) => {
        try {
            console.log('api url', api.defaults.baseURL);
            const response = await api.post<GuestLoginResponse>(`auth/guest?name=${encodeURIComponent(name)}`, null);
            if (response.data.success) {
                console.log(response.data);
                return response.data;
            }
            return rejectWithValue(response.data.message);
        } catch (error) {
            console.log('error', error);
            if (error instanceof AxiosError) {
                return rejectWithValue(
                    error.response?.data?.message
                );
            }
            return rejectWithValue('An unexpected error occurred');
        }
    },
);

export const googleSignIn = createAsyncThunk<GoogleLoginResponse, void, { rejectValue: string }>(
    'auth/googleSignIn',
    async (_, { rejectWithValue }) => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const code = userInfo?.data?.serverAuthCode;
            if (!code) {
                return rejectWithValue('Google sign-in did not return a code');
            }
            const response = await api.post<GoogleLoginResponse>('auth/callback?code=' + code);
            return response.data;
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                return rejectWithValue('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                return rejectWithValue('Signing in');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                return rejectWithValue('Play services not available');
            } else {
                console.log(error);
                return rejectWithValue('Unknown error');
            }
        }
    }
);

export const getAccessTokenFromRefreshToken = createAsyncThunk<GetAccessTokenFromRefreshTokenResponse, string, { rejectValue: string }>(
    'auth/getAccessTokenFromRefreshToken',
    async (refreshToken, { rejectWithValue }) => {
        try {
            const response = await api.post<GetAccessTokenFromRefreshTokenResponse>(`auth/access-token?refresh_token=${encodeURIComponent(refreshToken)}`, null);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(
                    error.response?.data?.message
                );
            }
            return rejectWithValue('An unexpected error occurred');
        }
    },
);

const initialState: AuthState = {
    name: '',
    email: null,
    profile_pic: null,
    access_token: null,
    refresh_token: null,
    token: null,
    loading: false,
    error: null,
    isLoggedIn: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginAsGuest.pending, (state) => {
            state.loading = true;
        }).addCase(loginAsGuest.fulfilled, (state, action) => {
            state.name = action.payload.data.name;
            state.token = action.payload.data.token;
            state.loading = false;
            state.isLoggedIn = true;
        }).addCase(loginAsGuest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Guest login failed';
        }).addCase(googleSignIn.pending, (state) => {
            state.loading = true;
        }).addCase(googleSignIn.fulfilled, (state, action) => {
            state.name = action.payload.data.name;
            state.email = action.payload.data.email;
            state.profile_pic = action.payload.data.profile_pic;
            state.access_token = action.payload.data.access_token;
            state.refresh_token = action.payload.data.refresh_token;
            state.loading = false;
            state.isLoggedIn = true;
        }).addCase(googleSignIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Google sign-in failed';
        }).addCase(getAccessTokenFromRefreshToken.pending, (state) => {
            state.loading = true;
        }).addCase(getAccessTokenFromRefreshToken.fulfilled, (state, action) => {
            state.access_token = action.payload.data.access_token;
            state.loading = false;
        }).addCase(getAccessTokenFromRefreshToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Get access token from refresh token failed';
        });
    },
});

export default authSlice.reducer;
export const { resetAuthState } = authSlice.actions;