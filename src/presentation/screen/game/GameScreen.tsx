import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { RootStackParamList } from '@type';
import ChatComponent from '@/presentation/component/chatComponent/ChatComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameComponent from '@/presentation/component/gameComponent/GameComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { leaveRoom, resetRoomState } from '@/store/slices/roomSlice';
import showErrorMessage from '@/presentation/component/ErrorDialog';

const GameScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const { leaveRoomLoading, leaveRoomError, leaveRoomSuccess } = useSelector((state: RootState) => state.room);

    useEffect(() => {
        if (leaveRoomError) {
            showErrorMessage(leaveRoomError);
        }
    }, [leaveRoomError]);

    useEffect(() => {
        if (leaveRoomSuccess) {
            dispatch(resetRoomState());
        }
    }, [leaveRoomSuccess, navigation, dispatch]);

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