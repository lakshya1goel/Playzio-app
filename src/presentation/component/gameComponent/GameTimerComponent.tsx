import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import gameWs from '@/service/GameWebsocketService';
import { gameTimerComponentStyles } from './GameTimerComponent.styles';
import { setCharSet, setCurrentTurn, setRound, setTimeLimit } from '@/store/slices/gameSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

const GameTimerComponent = () => {
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleTimerStarted = (message: any) => {
            console.log('Timer started:', message);
            const duration = message.payload?.duration || 120;
            setTimer(duration);
            setIsTimerActive(true);
        };

        const handleGameStart = (message: any) => {
            console.log('Game started:', message);
            setIsTimerActive(false);
            setTimer(0);
            dispatch(setCurrentTurn(message.payload?.current_turn || 0));
            dispatch(setRound(message.payload?.round || 0));
            dispatch(setTimeLimit(message.payload?.time_limit || 0));
            dispatch(setCharSet(message.payload?.char_set || []));
        };

        gameWs.on('timer_started', handleTimerStarted);
        gameWs.on('start_game', handleGameStart);

        return () => {
            gameWs.off('timer_started', handleTimerStarted);
            gameWs.off('start_game', handleGameStart);
        };
    }, []);

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