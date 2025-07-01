import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import { loginScreenStyles } from './LoginScreen.styles';
import playzioLogo from '@assets/icons/playzio_logo.png';

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={loginScreenStyles.container}>
            <View style={loginScreenStyles.outerContainer}>
                <Image source={playzioLogo} style={loginScreenStyles.logo} />
                <TouchableOpacity style={loginScreenStyles.guestButton} onPress={() => navigation.navigate('Username')}>
                    <Text style={loginScreenStyles.guestButtonText}>Play as guest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={loginScreenStyles.googleButton} onPress={() => navigation.navigate('RoomChoice')}>
                    <Text style={loginScreenStyles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    );  
};

export default LoginScreen;