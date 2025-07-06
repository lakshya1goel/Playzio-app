import { User } from "./auth";

export interface RoomState {
    room: Room | null;
    rooms: Room[];
    loading: boolean;
    error: string | null;
    success: boolean;
    fetchRoomsSuccess: boolean;
    fetchRoomsLoading: boolean;
    fetchRoomsError: string | null;
    leaveRoomSuccess: boolean;
    leaveRoomLoading: boolean;
    leaveRoomError: string | null;
}

export interface CreateRoomRequest {
    name: string;
    type: string;
}

export interface CreateRoomResponse {
    success: boolean;
    message: string;
    data: Room;
}

export interface Room {
    ID: number;
    name: string;
    type: string;
    created_by: number;
    join_code: string;
    creator_guest_id: string;
    members: Member[];
}

export interface Member {
    ID: number;
    room_id: number;
    user_id: number;
    user: User;
    guest_id: string;
    guest_name: string;
    is_creator: boolean;
}

export interface JoinRoomResponse {
    success: boolean;
    message: string;
    data: Room;
}

export interface LeaveRoomResponse {
    success: boolean;
    message: string;
}

export interface GetRoomsResponse {
    success: boolean;
    message: string;
    data: Room[];
}