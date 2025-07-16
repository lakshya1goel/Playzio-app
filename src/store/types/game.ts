export interface GameUser {
    user_id: number;
    user_name: string;
    lives?: number;
    score?: number;
}

export interface GameState {
    current_turn: number;
    round: number;
    time_limit: number;
    char_set: string;
    typing_text: string;
    is_answer_correct: boolean | null;
    winner_id: number | null;
    players: GameUser[];
}