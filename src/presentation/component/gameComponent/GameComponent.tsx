import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import player1 from '@assets/images/player1.png';
import player2 from '@assets/images/player2.png';
import player3 from '@assets/images/player3.png';
import player4 from '@assets/images/player4.png';
import player5 from '@assets/images/player5.png';
import player6 from '@assets/images/player6.png';
import player7 from '@assets/images/player7.png';
import player8 from '@assets/images/player8.jpeg';
import player9 from '@assets/images/player9.jpeg';
import player10 from '@assets/images/player10.png';
import bomb from '@assets/images/bomb.png';
import { gameComponentStyles, PLAYER_SIZE, CENTER_SIZE, RADIUS, CENTER_X, CENTER_Y } from './GameComponent.styles';
import { GameUser } from '@/store/types/game';
import gameWs from '@/service/GameWebsocketService';

const defaultPlayerImages = [
    player1, player2, player3, player4, player5,
    player6, player7, player8, player9, player10
];

const PlayerCircle = ({ player, idx, total }: { player: GameUser, idx: number, total: number }) => {
    const angle = (2 * Math.PI * idx) / total;
    const x = CENTER_X + RADIUS * Math.cos(angle) - PLAYER_SIZE / 2;
    const y = CENTER_Y + RADIUS * Math.sin(angle) - PLAYER_SIZE / 2;

    const image = defaultPlayerImages[idx % defaultPlayerImages.length];

    return (
        <View
            key={idx}
            style={[
                gameComponentStyles.playerCircleContainer,
                {
                    left: x,
                    top: y,
                    width: PLAYER_SIZE,
                    height: PLAYER_SIZE + 20,
                },
            ]}
        >
            <Text style={gameComponentStyles.playerName}>{player.user_name}</Text>
            <View style={gameComponentStyles.avatarContainer}>
                <Image
                    source={image}
                    style={gameComponentStyles.avatar}
                />
            </View>
        </View>
    );
};

const CenterCircle = () => (
    <View
        style={[
            gameComponentStyles.centerCircleContainer,
            {
                left: CENTER_X - CENTER_SIZE / 2,
                top: CENTER_Y - CENTER_SIZE / 2,
                width: CENTER_SIZE,
                height: CENTER_SIZE,
            },
        ]}
    >
        <Image
            source={bomb}
            style={gameComponentStyles.centerCircleImage}
            resizeMode="cover"
        />
        <Text style={gameComponentStyles.centerCircleText}>Center</Text>
    </View>
);

const GameComponent = () => {
    const [players, setPlayers] = useState<GameUser[]>([]);

    useEffect(() => {
        const handleUserJoined = (message: any) => {
            console.log('User joined:', message);
            
            if (message.type === 'user_joined') {
                const newUser: GameUser = {
                    user_id: message.payload.user_id,
                    user_name: message.payload.user_name,
                    lives: 3,
                };

                setPlayers(prevUsers => {
                    const userExists = prevUsers.some(user => user.user_id === newUser.user_id);
                    if (!userExists) {
                        return [...prevUsers, newUser];
                    }
                    return prevUsers;
                });
            }
        };

        const handleUserLeft = (message: any) => {
            console.log('User left:', message);
            
            if (message.type === 'user_left' || message.type === 'leave') {
                const userId = message.payload?.user_id || message.user_id;
                setPlayers(prevUsers => 
                    prevUsers.filter(user => user.user_id !== userId)
                );
            }
        };

        gameWs.on('user_joined', handleUserJoined);
        gameWs.on('user_left', handleUserLeft);
        gameWs.on('leave', handleUserLeft);

        return () => {
            gameWs.off('user_joined', handleUserJoined);
            gameWs.off('user_left', handleUserLeft);
            gameWs.off('leave', handleUserLeft);
        };
    }, []);

    return (
        <View style={[gameComponentStyles.outerContainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={gameComponentStyles.boardContainer}>
                <CenterCircle />
                {players.map((player, idx) => (
                    <PlayerCircle key={idx} player={player} idx={idx} total={players.length} />
                ))}
            </View>
        </View>
    );  
};

export default GameComponent;