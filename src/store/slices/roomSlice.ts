import api from "@/service/ApiService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateRoomRequest, CreateRoomResponse, GetRoomsResponse, JoinRoomResponse, LeaveRoomResponse, RoomState } from "../types/room";
import authService from "@/service/AuthService";

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
            console.log(response.data);
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

export const joinRoom = createAsyncThunk<JoinRoomResponse, string, { rejectValue: string }>(
    'room/joinRoom',
    async (joinCode, { rejectWithValue }) => {
        try {
            const response = await api.post<JoinRoomResponse>(`room/join?join_code=${encodeURIComponent(joinCode)}`, null);
            console.log(response.data);
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

export const getRooms = createAsyncThunk<GetRoomsResponse, void, { rejectValue: string }>(
    'room/getRooms',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<GetRoomsResponse>(`room/public`);
            console.log(response.data);
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

export const leaveRoom = createAsyncThunk<LeaveRoomResponse, void, { rejectValue: string }>(
    'room/leaveRoom',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post<LeaveRoomResponse>(`room/leave`);
            console.log(response.data);
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

const initialState: RoomState = {
    room: null,
    rooms: [],
    loading: false,
    error: null,
    success: false,
    fetchRoomsSuccess: false,
    fetchRoomsLoading: false,
    fetchRoomsError: null,
    leaveRoomSuccess: false,
    leaveRoomLoading: false,
    leaveRoomError: null,
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        resetRoomState: (state) => {
            state.room = initialState.room;
            state.rooms = initialState.rooms;
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.success = initialState.success;
            state.fetchRoomsSuccess = initialState.fetchRoomsSuccess;
            state.fetchRoomsLoading = initialState.fetchRoomsLoading;
            state.fetchRoomsError = initialState.fetchRoomsError;
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
        }).addCase(joinRoom.pending, (state) => {
            state.loading = true;
        }).addCase(joinRoom.fulfilled, (state, action) => {
            state.room = action.payload.data;
            state.loading = false;
            state.success = true;
        }).addCase(joinRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Join room failed';
        }).addCase(getRooms.pending, (state) => {
            state.fetchRoomsLoading = true;
        }).addCase(getRooms.fulfilled, (state, action) => {
            state.rooms = action.payload.data;
            state.fetchRoomsLoading = false;
            state.fetchRoomsSuccess = true;
        }).addCase(getRooms.rejected, (state, action) => {
            state.fetchRoomsLoading = false;
            state.fetchRoomsError = action.payload || 'Get rooms failed';
        }).addCase(leaveRoom.pending, (state) => {
            state.leaveRoomLoading = true;
        }).addCase(leaveRoom.fulfilled, (state) => {
            state.leaveRoomLoading = false;
            state.leaveRoomSuccess = true;
        }).addCase(leaveRoom.rejected, (state, action) => {
            state.leaveRoomLoading = false;
            state.leaveRoomError = action.payload || 'Leave room failed';
        });
    },
});

export default roomSlice.reducer;
export const { resetRoomState } = roomSlice.actions;