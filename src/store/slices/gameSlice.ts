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
        setCurrentTurn: (state, action) => {
            state.current_turn = action.payload;
        },
        setRound: (state, action) => {
            state.round = action.payload;
        },
        setTimeLimit: (state, action) => {
            state.time_limit = action.payload;
        },
        setCharSet: (state, action) => {
            state.char_set = action.payload;
        },
        setLives: (state, action) => {
            state.players = state.players.map(player => ({
                ...player,
                lives: player.user_id === action.payload.user_id ? action.payload.lives : player.lives
            }));
        },
        setScore: (state, action) => {
            state.players = state.players.map(player => ({
                ...player,
                score: player.user_id === action.payload.user_id ? action.payload.score : player.score
            }));
        },
        setWinnerId: (state, action) => {
            state.winner_id = action.payload;
        },
        addPlayer: (state, action) => {
            state.players.push(action.payload);
        },
        removePlayer: (state, action) => {
            state.players = state.players.filter(player => player.user_id !== action.payload);
        },
        setPlayers: (state, action) => {
            state.players = action.payload;
        },
        setTypingText: (state, action) => {
            state.typing_text = action.payload;
        },
        setAnswerStatus: (state, action) => {
            state.is_answer_correct = action.payload;
        }
    },
});

export default gameSlice.reducer;
export const { resetGameState, setCurrentTurn, setRound, setTimeLimit, setCharSet, setLives, setScore, setWinnerId, addPlayer, removePlayer, setPlayers, setTypingText, setAnswerStatus } = gameSlice.actions;