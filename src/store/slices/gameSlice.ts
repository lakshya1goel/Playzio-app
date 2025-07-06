import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "../types/game";

const initialState: GameState = {
    current_turn: -1,
    round: 0,
    time_limit: 0,
    char_set: '',
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
        addPlayer: (state, action) => {
            state.players.push(action.payload);
        },
        removePlayer: (state, action) => {
            state.players = state.players.filter(player => player.user_id !== action.payload);
        },
        setPlayers: (state, action) => {
            state.players = action.payload;
        }
    },
});

export default gameSlice.reducer;
export const { resetGameState, setCurrentTurn, setRound, setTimeLimit, setCharSet, addPlayer, removePlayer, setPlayers } = gameSlice.actions;