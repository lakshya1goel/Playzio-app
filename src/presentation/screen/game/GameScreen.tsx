import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import ChatComponent from '@/presentation/component/chatComponent/ChatComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameComponent from '@/presentation/component/gameComponent/GameComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { leaveRoom, resetRoomState } from '@/store/slices/roomSlice';
import showErrorMessage from '@/presentation/component/ErrorDialog';
import GameTimerComponent from '@/presentation/component/gameComponent/GameTimerComponent';
import gameWs from '@/service/GameWebsocketService';
import chatWs from '@/service/ChatWebsocketService';

const GameScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { leaveRoomLoading, leaveRoomError, leaveRoomSuccess } = useSelector((state: RootState) => state.room);

    useEffect(() => {
        if (leaveRoomError) {
            showErrorMessage(leaveRoomError);
        }
    }, [leaveRoomError]);

    useEffect(() => {
        if (leaveRoomSuccess) {
            gameWs.leaveRoom();
            chatWs.leaveRoom();
            dispatch(resetRoomState());
        }
    }, [leaveRoomSuccess, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(leaveRoom());
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {leaveRoomLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
            ) : (
                <>
                    <GameTimerComponent />
                    <GameComponent />
                    <ChatComponent />
                </>
            )}
        </SafeAreaView>
    );  
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default GameScreen;