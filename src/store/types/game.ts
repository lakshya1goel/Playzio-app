export interface GameUser {
    user_id: number;
    user_name: string;
    lives?: number;
}

export interface GameState {
    current_turn: number;
    round: number;
    time_limit: number;
    char_set: string;
    players: GameUser[];
}