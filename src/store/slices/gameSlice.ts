import { createSlice } from '@reduxjs/toolkit';
import { GameState } from '../types/game';
import { RootState } from '../index';

const initialState: GameState = {
    roomId: null,
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
        setCurrentRoom: (state, action) => {
            state.roomId = action.payload;
        },

        resetGameState: state => {
            state.roomId = null;
            state.current_turn = initialState.current_turn;
            state.round = initialState.round;
            state.time_limit = initialState.time_limit;
            state.char_set = initialState.char_set;
            state.typing_text = initialState.typing_text;
            state.is_answer_correct = initialState.is_answer_correct;
            state.winner_id = initialState.winner_id;
            state.players = initialState.players;
        },
        // setCurrentTurn: (state, action) => {
        //     state.current_turn = action.payload;
        // },

        // setRound: (state, action) => {
        //     state.round = action.payload;
        // },

        // setTimeLimit: (state, action) => {
        //     state.time_limit = action.payload;
        // },

        // setCharSet: (state, action) => {
        //     state.char_set = action.payload;
        // },

        // setLives: (state, action) => {
        //     state.players = state.players.map(player => ({
        //         ...player,
        //         lives: player.user_id === action.payload.user_id ? action.payload.lives : player.lives
        //     }));
        // },

        // setScore: (state, action) => {
        //     state.players = state.players.map(player => ({
        //         ...player,
        //         score: player.user_id === action.payload.user_id ? action.payload.score : player.score
        //     }));
        // },

        // setWinnerId: (state, action) => {
        //     state.winner_id = action.payload;
        // },

        // addPlayer: (state, action) => {
        //     const existingPlayer = state.players.find(player => player.user_id === action.payload.user_id);
        //     if (!existingPlayer) {
        //         state.players.push(action.payload);
        //     } else {
        //         console.log('Player already exists:', action.payload.user_name);
        //     }
        // },

        // removePlayer: (state, action) => {
        //     state.players = state.players.filter(player => player.user_id !== action.payload);
        // },

        setPlayers: (state, action) => {
            state.players = action.payload;
        },

        // setTypingText: (state, action) => {
        //     state.typing_text = action.payload;
        // },

        // setAnswerStatus: (state, action) => {
        //     state.is_answer_correct = action.payload;
        // },

        userJoined: (state, action) => {
            const { user_id, user_name } = action.payload;
            const existingPlayer = state.players.find(
                player => player.user_id === user_id,
            );
            if (!existingPlayer) {
                state.players.push({ user_id, user_name, lives: 3, score: 0 });
            } else {
                console.log('Player already exists:', user_name);
            }
        },

        userLeft: (state, action) => {
            const { user_id } = action.payload;
            state.players = state.players.filter(
                player => player.user_id !== user_id,
            );
        },

        answerResponse: (state, action) => {
            const { correct, answer, new_char_set, score, lives, user_id } =
                action.payload;
            state.is_answer_correct = correct;
            state.typing_text = answer;
            if (new_char_set) state.char_set = new_char_set;
            if (score !== undefined) {
                state.players = state.players.map(p =>
                    p.user_id === user_id ? { ...p, score } : p,
                );
            }
            if (lives !== undefined) {
                state.players = state.players.map(p =>
                    p.user_id === user_id ? { ...p, lives } : p,
                );
            }
        },

        typing: (state, action) => {
            const { text } = action.payload;
            state.typing_text = text;
        },

        timerStarted: (state, action) => {
            const { duration } = action.payload;
            state.time_limit = duration;
        },

        startGame: (state, action) => {
            const { char_set, round, time_limit } = action.payload;
            state.char_set = char_set;
            state.round = round;
            state.time_limit = time_limit;
        },

        nextTurn: (state, action) => {
            const { user_id, char_set, time_limit, round } = action.payload;
            state.current_turn = user_id;
            state.char_set = char_set;
            state.time_limit = time_limit;
            state.round = round;
            state.typing_text = '';
            state.is_answer_correct = null;
        },

        turnEnded: (state, action) => {
            const { user_id, lives_left, score, round } = action.payload;
            state.players = state.players.map(p =>
                p.user_id === user_id ? { ...p, lives: lives_left, score } : p,
            );
            state.round = round;
            state.typing_text = '';
            state.is_answer_correct = null;
        },

        gameOver: (state, action) => {
            const { winner_id } = action.payload;
            state.winner_id = winner_id;
        },
    },
});

export default gameSlice.reducer;
export const {
    setCurrentRoom,
    resetGameState,
    setPlayers,
    typing,
    userJoined,
    userLeft,
    answerResponse,
    timerStarted,
    startGame,
    nextTurn,
    turnEnded,
    gameOver,
} = gameSlice.actions;
