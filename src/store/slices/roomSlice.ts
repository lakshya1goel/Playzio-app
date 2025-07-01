import api from "@/service/apiService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateRoomRequest, CreateRoomResponse, RoomState } from "../types/room";
import authService from "@/service/authService";

api.interceptors.request.use(
    async (config) => {
        const tokens = await authService.getToken();
            if (tokens?.accessToken) {
                config.headers.Authorization = `Bearer ${tokens.accessToken}`;
            }
            return config;
        },
    (error) => Promise.reject(error)
);

export const createRoom = createAsyncThunk<CreateRoomResponse, CreateRoomRequest, { rejectValue: string }>(
    'room/createRoom',
    async (room, { rejectWithValue }) => {
        try {
            const response = await api.post<CreateRoomResponse>(`room`, room);
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

    const initialState: RoomState = {
        room: null,
        loading: false,
        error: null,
        success: false,
    };

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        resetRoomState: (state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createRoom.pending, (state) => {
            state.loading = true;
        }).addCase(createRoom.fulfilled, (state, action) => {
            state.room = action.payload.data;
            state.loading = false;
            state.success = true;
        }).addCase(createRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Create room failed';
        });
    },
});

export default roomSlice.reducer;
export const { resetRoomState } = roomSlice.actions;