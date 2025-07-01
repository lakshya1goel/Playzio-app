import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '@type';
import ChatComponent from '@/presentation/component/chatComponent/ChatComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameComponent from '@/presentation/component/gameComponent/GameComponent';

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