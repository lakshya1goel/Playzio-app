import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { RootStackParamList } from '@type';
import { splashScreenStyles } from './SplashScreen.styles';
import playzioLogo from '@assets/icons/playzio_logo.png';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={splashScreenStyles.container}>
      <Image source={playzioLogo} style={splashScreenStyles.logo} />
    </View>
  );
};

export default SplashScreen;