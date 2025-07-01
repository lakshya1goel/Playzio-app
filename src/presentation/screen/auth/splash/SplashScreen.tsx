import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { RootStackParamList } from '../../../../type';
import { splashScreenStyles } from './SplashScreen.styles';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={splashScreenStyles.container}>
      <Image source={require('../../../../../assets/icons/playzio_logo.png')} style={splashScreenStyles.logo} />
    </View>
  );
};

export default SplashScreen;