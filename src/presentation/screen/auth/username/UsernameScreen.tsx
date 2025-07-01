import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import { usernameScreenStyles } from './UsernameScreen.styles';
import playzioLogo from '@assets/icons/playzio_logo.png';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

const UsernameScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <View style={usernameScreenStyles.container}>
            <Image source={playzioLogo} style={usernameScreenStyles.logo} />
            <Text style={usernameScreenStyles.headerText}>Enter Your Username</Text>
            <Text style={usernameScreenStyles.titleText}>Username</Text>
            <TextInput style={usernameScreenStyles.input} placeholder="Username" placeholderTextColor="#4A0E72" />
            <TouchableOpacity style={usernameScreenStyles.button} onPress={() => navigation.navigate('RoomChoice')} >
                <Text style={usernameScreenStyles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );  
};

export default UsernameScreen;