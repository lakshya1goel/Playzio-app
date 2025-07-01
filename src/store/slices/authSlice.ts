import api from "@/service/apiService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AuthState, GuestLoginResponse } from "../types/auth";

export const loginAsGuest = createAsyncThunk<GuestLoginResponse, string, { rejectValue: string }>(
    'auth/loginAsGuest',
    async (name, { rejectWithValue }) => {
        try {
            const response = await api.post<GuestLoginResponse>(`auth/guest?name=${encodeURIComponent(name)}`, null);
            if (response.data.success) {
                console.log(response.data);
                return response.data;
            }
            return rejectWithValue(response.data.message);
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
        });
    },
});

export default authSlice.reducer;
export const { resetAuthState } = authSlice.actions;