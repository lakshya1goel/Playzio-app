import React from 'react';
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

const players = [
    { name: 'Player 1', lives: 3, image: player1 },
    { name: 'Player 2', lives: 3, image: player2 },
    { name: 'Player 3', lives: 3, image: player3 },
    { name: 'Player 4', lives: 3, image: player4 },
    { name: 'Player 5', lives: 3, image: player5 },
    { name: 'Player 6', lives: 3, image: player6 }, 
    { name: 'Player 7', lives: 3, image: player7 },
    { name: 'Player 8', lives: 3, image: player8 },
    { name: 'Player 9', lives: 3, image: player9 },
    { name: 'Player 10', lives: 3, image: player10 },
];

const PlayerCircle = ({ player, idx, total }: { player: any, idx: number, total: number }) => {
    const angle = (2 * Math.PI * idx) / total;
    const x = CENTER_X + RADIUS * Math.cos(angle) - PLAYER_SIZE / 2;
    const y = CENTER_Y + RADIUS * Math.sin(angle) - PLAYER_SIZE / 2;

    return (
        <View
            key={player.name}
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
            <Text style={gameComponentStyles.playerName}>{player.name}</Text>
            <View style={gameComponentStyles.avatarContainer}>
                <Image
                    source={player.image}
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
    return (
        <View style={[gameComponentStyles.outerContainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={gameComponentStyles.boardContainer}>
                <CenterCircle />
                {players.map((player, idx) => (
                    <PlayerCircle key={player.name} player={player} idx={idx} total={players.length} />
                ))}
            </View>
        </View>
    );  
};

export default GameComponent;