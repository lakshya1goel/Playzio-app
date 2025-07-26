export interface GameMessage {
    type: string;
    payload?: any;
}

export const MESSAGE_TYPES = {
    JOIN: 'join',
    ANSWER: 'answer',
    LEAVE: 'leave',
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
} as const;

export interface AnswerResponsePayload {
    correct: boolean;
    answer: string;
    new_char_set?: string;
    score?: number;
    lives?: number;
    room_id: number;
    user_id: number;
}

export interface TypingPayload {
    text: string;
    room_id: number;
    user_id: number;
}

export interface TimerStartedPayload {
    room_id: number;
    duration: number;
}

export interface StartGamePayload {
    room_id: number;
    message: string;
    char_set: string;
    round: number;
    time_limit: number;
}

export interface UserJoinedPayload {
    user_id: number;
    user_name: string;
    message: string;
    room_id: number;
}

export interface UserLeftPayload {
    user_id: number;
    user_name: string;
    message: string;
    room_id: number;
}

export interface GameOverPayload {
    room_id: number;
    winner_id: number;
    final_scores: Record<string, any>;
}

export interface NextTurnPayload {
    room_id: number;
    user_id: number;
    char_set: string;
    time_limit: number;
    round: number;
}

export interface TurnEndedPayload {
    room_id: number;
    user_id: number;
    reason: string;
    lives_left: number;
    round: number;
    score: number;
}

export interface PingPayload {
    timestamp: number;
    ping_id: number;
}

export interface PongPayload {
    timestamp: number;
}
