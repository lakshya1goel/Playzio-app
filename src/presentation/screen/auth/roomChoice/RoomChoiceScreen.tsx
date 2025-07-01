import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import { roomChoiceScreenStyles } from './RoomChoiceScreen.styles';
import playzioLogo from '@assets/icons/playzio_logo.png';

const RoomChoiceScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={roomChoiceScreenStyles.container}>
            <View style={roomChoiceScreenStyles.outerContainer}>
                <Image source={playzioLogo} style={roomChoiceScreenStyles.logo} />
                <Text style={roomChoiceScreenStyles.headerText}>Welcome to the Playzio!</Text>
                <TouchableOpacity style={roomChoiceScreenStyles.guestButton} onPress={() => navigation.navigate('CreateRoom')}>
                    <Text style={roomChoiceScreenStyles.guestButtonText}>Create Room</Text>
                </TouchableOpacity>
                <TouchableOpacity style={roomChoiceScreenStyles.googleButton} onPress={() => navigation.navigate('JoinRoom')}>
                    <Text style={roomChoiceScreenStyles.googleButtonText}>Join Room</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RoomChoiceScreen;