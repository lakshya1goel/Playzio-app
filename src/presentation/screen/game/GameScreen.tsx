import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../../type';
import ChatComponent from '../../components/ChatComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameComponent from '../../components/GameComponent';

const GameScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container}>
            <GameComponent />
            <ChatComponent />
        </SafeAreaView>
    );  
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});

export default GameScreen;