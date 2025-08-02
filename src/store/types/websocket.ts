export const MESSAGE_TYPES = {
    JOIN: 'join',
    LEAVE: 'leave',
    ANSWER: 'answer',
    TYPING: 'typing',
    TIMER_STARTED: 'timer_started',
    START_GAME: 'start_game',
    NEXT_TURN: 'next_turn',
    GAME_OVER: 'game_over',
    USER_JOINED: 'user_joined',
    USER_LEFT: 'user_left',
    TURN_ENDED: 'turn_ended',
    PING: 'ping',
    PONG: 'pong',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    ERROR: 'error',
} as const;

export const CHAT_MESSAGE_TYPES = {
    JOIN: 'join-room',
    LEAVE: 'leave-room',
    CHAT_CONTENT: 'chat-content',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    ERROR: 'error',
} as const;

export interface Message {
    ID: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    type: string;
    body: string;
    sender: number;
    room_id: number;
}