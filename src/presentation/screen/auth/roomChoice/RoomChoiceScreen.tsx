import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import { roomChoiceScreenStyles } from './RoomChoiceScreen.styles';
import playzioLogo from '@assets/icons/playzio_logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import gameWs from '@/service/GameWebsocketService';
import showErrorMessage from '@/presentation/component/ErrorDialog';
import { WEBSOCKET_URL } from '@env';

const RoomChoiceScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const initWebSocket = async () => {
            setIsConnecting(true);
            try {
                await gameWs.connect(WEBSOCKET_URL);
                console.log('WebSocket connected successfully on RoomChoiceScreen');
            } catch (error) {
                console.error('Failed to connect WebSocket:', error);
                showErrorMessage('Failed to connect to game server. Please try again.');
            } finally {
                setIsConnecting(false);
            }
        };

        initWebSocket();

        const handleConnected = () => {
            console.log('WebSocket connected event received');
            setIsConnecting(false);
        };

        const handleDisconnected = () => {
            console.log('WebSocket disconnected event received');
            setIsConnecting(true);
        };

        const handleError = (error: any) => {
            console.error('WebSocket error event received:', error);
            setIsConnecting(false);
            showErrorMessage('Lost connection to game server. Please check your internet connection.');
        };

        gameWs.on('connected', handleConnected);
        gameWs.on('disconnected', handleDisconnected);
        gameWs.on('error', handleError);

        return () => {
            gameWs.off('connected', handleConnected);
            gameWs.off('disconnected', handleDisconnected);
            gameWs.off('error', handleError);
        };
    }, []);

    return (
        <SafeAreaView style={roomChoiceScreenStyles.container}>
            <View style={roomChoiceScreenStyles.outerContainer}>
                <Image source={playzioLogo} style={roomChoiceScreenStyles.logo} />
                <Text style={roomChoiceScreenStyles.headerText}>Welcome to the Playzio!</Text>
                {isConnecting && (
                    <Text style={roomChoiceScreenStyles.connectingText}>
                        Connecting to server...
                    </Text>
                )}
                <TouchableOpacity style={[roomChoiceScreenStyles.guestButton, isConnecting && roomChoiceScreenStyles.disabledButton]} onPress={() => navigation.navigate('CreateRoom')}>
                    <Text style={roomChoiceScreenStyles.guestButtonText}>Create Room</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[roomChoiceScreenStyles.googleButton, isConnecting && roomChoiceScreenStyles.disabledButton]} onPress={() => navigation.navigate('JoinRoom')}>
                    <Text style={roomChoiceScreenStyles.googleButtonText}>Join Room</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RoomChoiceScreen;