import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import { usernameScreenStyles } from './UsernameScreen.styles';
import playzioLogo from '@assets/icons/playzio_logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import showErrorMessage from '@/presentation/component/ErrorDialog';
import { loginAsGuest } from '@/store/slices/authSlice';
import AuthService from '@/service/AuthService';
import { SafeAreaView } from 'react-native-safe-area-context';

const UsernameScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState('');
    const { loading, error, isLoggedIn, token, user_id } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (error) {
            showErrorMessage(error);
        }
    }, [error]);

    useEffect(() => {
        if (isLoggedIn) {
            const saveTokens = async () => {
                try {
                    const accessExpTime = new Date();
                    accessExpTime.setDate(accessExpTime.getDate() + 1);
                    const refreshExpTime = new Date();
                    refreshExpTime.setDate(refreshExpTime.getDate() + 30);
                    await AuthService.storeToken({
                        accessToken: token || '',
                        refreshToken: token || '',
                        accessExpTime: accessExpTime.getTime(),
                        refreshExpTime: refreshExpTime.getTime(),
                        userType: 'guest',
                        userID: user_id || 0,
                    });
                    setName('');
                    navigation.replace('RoomChoice');
                } catch (error) {
                    showErrorMessage('Failed to save authentication tokens');
                }
            };
            saveTokens();
        }
    }, [isLoggedIn, navigation, token]);

    const validateUsername = (): boolean => {
        if (!name) {
            showErrorMessage('Please enter a username');
            return false;
        }
        return true;
    };

    const handleGuestLogin = async () => {
        if (!validateUsername()) return;
        await dispatch(loginAsGuest(name)).unwrap();
    };

    return (
        <SafeAreaView style={usernameScreenStyles.container}>
            <Image source={playzioLogo} style={usernameScreenStyles.logo} />
            <Text style={usernameScreenStyles.headerText}>Enter Your Username</Text>
            <Text style={usernameScreenStyles.titleText}>Username</Text>
            <TextInput
                style={usernameScreenStyles.input}
                placeholder="Username"
                placeholderTextColor="#4A0E72"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity
                style={usernameScreenStyles.button}
                onPress={handleGuestLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={usernameScreenStyles.buttonText}>Next</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default UsernameScreen;