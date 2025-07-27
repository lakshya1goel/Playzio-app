import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import gameWs from '@/service/GameWebsocketService';
import { gameTimerComponentStyles } from './GameTimerComponent.styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { startGame, timerStarted } from '@/store/slices/gameSlice';
import { MESSAGE_TYPES } from '@/store/types/websocket';

const GameTimerComponent = () => {
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { roomId } = useSelector((state: RootState) => state.game);

    useEffect(() => {
        const handleTimerStarted = (message: any) => {
            console.log('Timer started:', message);
            
            if (message.payload.room_id === roomId) {
                const duration = message.payload.duration;
                setTimer(duration);
                setIsTimerActive(true);
                dispatch(timerStarted(message.payload));
            }
        };

        const handleGameStart = (message: any) => {
            console.log('Game started:', message);
            
            if (message.payload.room_id === roomId) {
                setIsTimerActive(false);
                setTimer(0);
                dispatch(startGame(message.payload));
            }
        };

        gameWs.on(MESSAGE_TYPES.TIMER_STARTED, handleTimerStarted);
        gameWs.on(MESSAGE_TYPES.START_GAME, handleGameStart);

        return () => {
            gameWs.off(MESSAGE_TYPES.TIMER_STARTED, handleTimerStarted);
            gameWs.off(MESSAGE_TYPES.START_GAME, handleGameStart);
        };
    }, [dispatch, roomId]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        setIsTimerActive(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isTimerActive, timer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isTimerActive) return null;

    return (
        <View style={gameTimerComponentStyles.timerContainer}>
            <Text style={gameTimerComponentStyles.timerText}>
                Game will start in {formatTime(timer)}
            </Text>
        </View>
    );
};

export default GameTimerComponent;