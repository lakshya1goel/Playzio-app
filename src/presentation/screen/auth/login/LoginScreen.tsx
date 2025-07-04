import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import { loginScreenStyles } from './LoginScreen.styles';
import playzioLogo from '@assets/icons/playzio_logo.png';
import googleLogo from '@assets/icons/google_icon.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEBCLIENT_ID } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import showErrorMessage from '@/presentation/component/ErrorDialog';
import { googleSignIn } from '@/store/slices/authSlice';
import AuthService from '@/service/AuthService';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, isLoggedIn, access_token, refresh_token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (error) {
            showErrorMessage(error);
        }
    }, [error]);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: WEBCLIENT_ID,
            offlineAccess: true,
            forceCodeForRefreshToken: true,
            scopes: ['profile', 'email']
        });
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const saveTokens = async () => {
                try {
                    const accessExpTime = new Date();
                    accessExpTime.setDate(accessExpTime.getDate() + 1);
                    const refreshExpTime = new Date();
                    refreshExpTime.setDate(refreshExpTime.getDate() + 30);
                    await AuthService.storeToken({
                        accessToken: access_token || '',
                        refreshToken: refresh_token || '',
                        accessExpTime: accessExpTime.getTime(),
                        refreshExpTime: refreshExpTime.getTime(),
                        userType: 'google'
                    });
                    navigation.replace('RoomChoice');
                } catch (error) {
                    showErrorMessage('Failed to save authentication tokens');
                }
            };
            saveTokens();
        }
    }, [isLoggedIn, navigation, access_token, refresh_token]);

    const handleGoogleLogin = async () => {
        await dispatch(googleSignIn()).unwrap();
    };

    return (
        <SafeAreaView style={loginScreenStyles.container}>
            <View style={loginScreenStyles.outerContainer}>
                <Image source={playzioLogo} style={loginScreenStyles.logo} />
                <TouchableOpacity style={loginScreenStyles.guestButton} onPress={() => navigation.navigate('Username')}>
                    <Text style={loginScreenStyles.guestButtonText}>Play as guest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={loginScreenStyles.googleButton} onPress={handleGoogleLogin}>
                    {loading ? (
                    <ActivityIndicator color="#fff" />
                    ) : (
                        <View style={loginScreenStyles.rowStyle}>
                            <Image source={googleLogo} style={loginScreenStyles.googleButtonImage} resizeMode="contain" />
                            <Text style={loginScreenStyles.googleButtonText}>Continue with Google</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );  
};

export default LoginScreen;