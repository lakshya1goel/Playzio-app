import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AppState } from 'react-native';
import gameWs from '@/service/GameWebsocketService';

const App = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: string) => {
        if (nextAppState === 'active') {
            console.log('App came to foreground');
        } else if (nextAppState === 'background' || nextAppState === 'inactive') {
            console.log('App went to background, keeping WebSocket alive');
        }
    });

    return () => {
        subscription?.remove();
        gameWs.disconnect();
    };
  }, []);
  return <AppNavigator />;
};

export default App;