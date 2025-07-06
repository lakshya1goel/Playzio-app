import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import gameWs from '@/service/GameWebsocketService';
import { gameTimerComponentStyles } from './GameTimerComponent.styles';

const GameTimerComponent = () => {
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

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
        };

        gameWs.on('timer_started', handleTimerStarted);

        return () => {
            gameWs.off('timer_started', handleTimerStarted);
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