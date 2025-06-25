import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../type';
import SplashScreen from '../presentation/screen/auth/SplashScreen';
import BackgroundWrapper from '../presentation/components/BackgroundWrapper';
import LoginScreen from '../presentation/screen/auth/LoginScreen';
import RoomChoiceScreen from '../presentation/screen/auth/RoomChoiceScreen';
import CreateRoomScreen from '../presentation/screen/room/CreateRoomScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" children={() => (<BackgroundWrapper><SplashScreen /></BackgroundWrapper>)} />
                <Stack.Screen name="Login" children={() => (<BackgroundWrapper><LoginScreen /></BackgroundWrapper>)} />
                <Stack.Screen name="RoomChoice" children={() => (<BackgroundWrapper><RoomChoiceScreen /></BackgroundWrapper>)} />
                <Stack.Screen name="CreateRoom" children={() => (<BackgroundWrapper><CreateRoomScreen /></BackgroundWrapper>)} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;  