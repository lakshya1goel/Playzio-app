import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
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

const PLAYER_SIZE = 50;
const CENTER_SIZE = 80;
const RADIUS = 130;
const CENTER_X = 180;
const CENTER_Y = 120;

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
                styles.playerCircleContainer,
                {
                    left: x,
                    top: y,
                    width: PLAYER_SIZE,
                    height: PLAYER_SIZE + 20,
                },
            ]}
        >
            <Text style={styles.playerName}>{player.name}</Text>
            <View style={styles.avatarContainer}>
                <Image
                    source={player.image}
                    style={styles.avatar}
                />
            </View>
        </View>
    );
};

const CenterCircle = () => (
    <View
        style={[
            styles.centerCircleContainer,
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
            style={styles.centerCircleImage}
            resizeMode="cover"
        />
        <Text style={styles.centerCircleText}>Center</Text>
    </View>
);

const GameComponent = () => {
    return (
        <View style={[styles.outerContainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={styles.boardContainer}>
                <CenterCircle />
                {players.map((player, idx) => (
                    <PlayerCircle key={player.name} player={player} idx={idx} total={players.length} />
                ))}
            </View>
        </View>
    );  
};

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        height: '55%',
    },
    boardContainer: {
        width: 360,
        height: 240,
        position: 'relative',
    },
    playerCircleContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    playerName: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 2,
        marginTop: 0,
    },
    avatarContainer: {
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        borderRadius: PLAYER_SIZE / 2,
        backgroundColor: '#4A0E72',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        overflow: 'hidden',
    },
    avatar: {
        width: PLAYER_SIZE - 8,
        height: PLAYER_SIZE - 8,
        borderRadius: (PLAYER_SIZE - 8) / 2,
        resizeMode: 'cover',
    },
    centerCircleContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        backgroundColor: 'transparent',
    },
    centerCircleImage: {
        width: CENTER_SIZE,
        height: CENTER_SIZE,
    },
    centerCircleText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        zIndex: 1,
    },
});

export default GameComponent;