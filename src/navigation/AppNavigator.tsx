import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '@type';
import SplashScreen from '@screens/auth/splash/SplashScreen';
import BackgroundWrapper from '@components/BackgroundWrapper';
import LoginScreen from '@screens/auth/login/LoginScreen';
import RoomChoiceScreen from '@screens/auth/roomChoice/RoomChoiceScreen';
import CreateRoomScreen from '@screens/room/CreateRoomScreen';
import JoinRoomScreen from '@screens/room/JoinRoomScreen';
import UsernameScreen from '@screens/auth/username/UsernameScreen';
import GameScreen from '@screens/game/GameScreen';

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
                <Stack.Screen name="Game" children={() => (<BackgroundWrapper><GameScreen /></BackgroundWrapper>)} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;  