import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList, Text, TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import playzioLogo from '@assets/icons/playzio_logo.png';
import { joinRoomScreenStyles } from './JoinScreenScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import showErrorMessage from '@/presentation/component/ErrorDialog';
import { getRooms, joinRoom, resetRoomState } from '@/store/slices/roomSlice';
import gameWs from '@/service/GameWebsocketService';

const JoinRoomScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const [joinCode, setJoinCode] = useState('');
    const { loading, error, success, fetchRoomsLoading, rooms, room } = useSelector((state: RootState) => state.room);

    useEffect(() => {
        if (error) {
            showErrorMessage(error);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            gameWs.joinRoom(room?.ID || 0);
            navigation.navigate('Game');
            dispatch(resetRoomState());
        }
    }, [success]);

    const validate = (): boolean => {
        if (!joinCode) {
            showErrorMessage('Please enter a room code');
            return false;
        }
        return true;
    };

    const handleJoinRoom = async (joinCode: string) => {
        await dispatch(joinRoom(joinCode)).unwrap();
    };

    const handleFetchRooms = async () => {
        await dispatch(getRooms()).unwrap();
    };

    useEffect(() => {
        handleFetchRooms();
    }, []);

    return (
        <SafeAreaView style={joinRoomScreenStyles.container}>
            <Image source={playzioLogo} style={joinRoomScreenStyles.logo} />
            <Text style={joinRoomScreenStyles.headerText}>Join a Room</Text>
            <Text style={joinRoomScreenStyles.titleText}>Enter Room Code</Text>
            <TextInput style={joinRoomScreenStyles.input} placeholder="Room Code" placeholderTextColor="#4A0E72" value={joinCode} onChangeText={setJoinCode} />
            <TouchableOpacity style={joinRoomScreenStyles.button} onPress={() => validate() && handleJoinRoom(joinCode)} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={joinRoomScreenStyles.buttonText}>Join Room</Text>
                )}
            </TouchableOpacity>
            <View style={joinRoomScreenStyles.orContainer}>
                <View style={joinRoomScreenStyles.orLine} />
                <Text style={joinRoomScreenStyles.orText}>OR</Text>
                <View style={joinRoomScreenStyles.orLine} />
            </View>
            <View style={joinRoomScreenStyles.outerContainer}>
            {fetchRoomsLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    rooms.length > 0 ? (
                <FlatList
                    data={rooms}
                    renderItem={({ item }) => (
                        <View style={joinRoomScreenStyles.itemContainer}>
                            <Text style={joinRoomScreenStyles.itemText}>{item.name}</Text>
                            <TouchableOpacity style={joinRoomScreenStyles.joinButton} onPress={() => handleJoinRoom(item.join_code)}>
                                <Text style={joinRoomScreenStyles.joinButtonText}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <Text style={joinRoomScreenStyles.noRoomsText}>No public rooms found</Text>
                )
            )}
            </View>
        </SafeAreaView>
    );  
};

export default JoinRoomScreen;