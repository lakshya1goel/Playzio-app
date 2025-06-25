import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../type';
import SplashScreen from '../presentation/screen/auth/SplashScreen';
import BackgroundWrapper from '../presentation/components/BackgroundWrapper';
import LoginScreen from '../presentation/screen/auth/LoginScreen';
import RoomChoiceScreen from '../presentation/screen/auth/RoomChoiceScreen';
import CreateRoomScreen from '../presentation/screen/room/CreateRoomScreen';
import JoinRoomScreen from '../presentation/screen/room/JoinRoomScreen';
import UsernameScreen from '../presentation/screen/auth/UsernameScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" children={() => (<BackgroundWrapper><SplashScreen /></BackgroundWrapper>)} />
                <Stack.Screen name="Login" children={() => (<BackgroundWrapper><LoginScreen /></BackgroundWrapper>)} />
                <Stack.Screen name="Username" children={() => (<BackgroundWrapper><UsernameScreen /></BackgroundWrapper>)} />
                <Stack.Screen name="RoomChoice" children={() => (<BackgroundWrapper><RoomChoiceScreen /></BackgroundWrapper>)} />
                <Stack.Screen name="CreateRoom" children={() => (<BackgroundWrapper><CreateRoomScreen /></BackgroundWrapper>)} />
                <Stack.Screen name="JoinRoom" children={() => (<BackgroundWrapper><JoinRoomScreen /></BackgroundWrapper>)} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;  