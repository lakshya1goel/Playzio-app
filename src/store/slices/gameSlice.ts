import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "../types/game";

const initialState: GameState = {
    current_turn: -1,
    round: 0,
    time_limit: 0,
    char_set: '',
    typing_text: '',
    is_answer_correct: null,
    winner_id: null,
    players: [],
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        resetGameState: (state) => {
            state.current_turn = initialState.current_turn;
            state.round = initialState.round;
            state.time_limit = initialState.time_limit;
            state.char_set = initialState.char_set;
            state.players = initialState.players;
        },
        setPlayers: (state, action) => {
            state.players = action.payload;
        },
        handleUserJoinedMessage: (state, action) => {
            const { user_id, user_name } = action.payload;
            const existingPlayer = state.players.find(player => player.user_id === user_id);
            if (!existingPlayer) {
                state.players.push({ user_id, user_name, lives: 3, score: 0 });
            } else {
                console.log('Player already exists:', user_name);
            }
        },
        handleUserLeftMessage: (state, action) => {
            const { user_id } = action.payload;
            state.players = state.players.filter(player => player.user_id !== user_id);
        },
        handleTypingMessage: (state, action) => {
            state.typing_text = action.payload.text;
        },
        handleAnswerMessage: (state, action) => {
            const { answer, correct } = action.payload;
            state.is_answer_correct = correct;
            state.typing_text = answer;
        },
        handleTurnEndMessage: (state, action) => {
            const { user_id, lives, score, round } = action.payload;
            state.players = state.players.map(player => ({
                ...player,
                lives: player.user_id === user_id ? lives : player.lives,
                score: player.user_id === user_id ? score : player.score,
            }));
            state.round = round;
            state.typing_text = '';
            state.is_answer_correct = null;
        },
        handleNextTurnMessage: (state, action) => {
            const { user_id, char_set, round, time_limit } = action.payload;
            state.current_turn = user_id;
            state.char_set = char_set;
            state.round = round;
            state.time_limit = time_limit;
            state.typing_text = '';
            state.is_answer_correct = null;
        },
        handleGameOverMessage: (state, action) => {
            const { winner_id } = action.payload;
            state.winner_id = winner_id;
        },
        handleGameStartMessage: (state, action) => {
            const { round, time_limit, char_set } = action.payload;
            state.current_turn = state.players[0].user_id;
            state.round = round;
            state.time_limit = time_limit;
            state.char_set = char_set;
        },
    },
});

export default gameSlice.reducer;
export const { resetGameState, setPlayers, handleUserJoinedMessage, handleUserLeftMessage, handleTypingMessage, handleAnswerMessage, handleTurnEndMessage, handleNextTurnMessage, handleGameOverMessage, handleGameStartMessage } = gameSlice.actions;