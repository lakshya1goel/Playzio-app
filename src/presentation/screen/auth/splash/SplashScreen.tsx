import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { RootStackParamList } from '@type';
import { splashScreenStyles } from './SplashScreen.styles';
import playzioLogo from '@assets/icons/playzio_logo.png';
import AuthService from '@/service/AuthService';
import { getAccessTokenFromRefreshToken } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      try {
        const tokens = await AuthService.getToken();
        await new Promise(resolve => setTimeout(resolve, 4000));

        if (tokens) {
          if (tokens.userType === 'guest') {
            await AuthService.removeToken();
            navigation.replace('Login');
          } else {
            const currentTime = new Date().getTime();
            const isTokenValid = currentTime < tokens.accessExpTime;

            if (isTokenValid) {
              navigation.replace('RoomChoice');
            } else {
              try {
                const result = await dispatch(getAccessTokenFromRefreshToken(tokens.refreshToken)).unwrap();
                if (result.success) {
                  const newAccessExpTime = new Date();
                  newAccessExpTime.setDate(newAccessExpTime.getDate() + 1);
                  await AuthService.storeToken({
                    accessToken: result.data.access_token,
                    refreshToken: tokens.refreshToken,
                    accessExpTime: newAccessExpTime.getTime(),
                    refreshExpTime: tokens.refreshExpTime,
                    userType: tokens.userType
                  });
                  navigation.replace('RoomChoice');
                } else {
                  navigation.replace('Login');
                }
              } catch (error) {
                console.error('Failed to refresh token:', error);
                navigation.replace('Login');
              }
            }
          }
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigation.replace('Login');
      }
    };

    checkAuthAndNavigate();
  }, [navigation, dispatch]);

  return (
    <View style={splashScreenStyles.container}>
      <Image source={playzioLogo} style={splashScreenStyles.logo} />
    </View>
  );
};

export default SplashScreen;