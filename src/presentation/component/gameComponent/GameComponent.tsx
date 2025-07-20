import React, { useEffect, useState } from 'react';
import { View, Image, Text, Modal, TouchableOpacity } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { addPlayer, removePlayer, setAnswerStatus, setCharSet, setCurrentTurn, setLives, setRound, setScore, setTimeLimit, setTypingText, setWinnerId } from '@/store/slices/gameSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@type';

const defaultPlayerImages = [
    player1, player2, player3, player4, player5,
    player6, player7, player8, player9, player10
];

const PlayerCircle = ({ player, idx, total, isCurrentTurn, typing_text }: { player: GameUser, idx: number, total: number, isCurrentTurn: boolean, typing_text: string }) => {
    const angle = (2 * Math.PI * idx) / total;
    const x = CENTER_X + RADIUS * Math.cos(angle) - PLAYER_SIZE / 2;
    const y = CENTER_Y + RADIUS * Math.sin(angle) - PLAYER_SIZE / 2;

    const image = defaultPlayerImages[idx % defaultPlayerImages.length];

    return (
        <View
            key={player.user_id}
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
            {isCurrentTurn && (
                <View style={{ alignItems: 'center', marginTop: 2 }}>
                    <Text style={{ color: '#FFD700', fontSize: 13 }}>
                        {typing_text || ''}
                    </Text>
                </View>
            )}
            <View style={gameComponentStyles.avatarContainer}>
                <Image source={image} style={gameComponentStyles.avatar} />
            </View>
            <Text style={gameComponentStyles.playerName}>
                {player.user_name} {isCurrentTurn ? '🔥' : ''}
            </Text>
            <View style={gameComponentStyles.playerStatusContainer}>
                {Array.from({ length: player.lives || 0 }).map((_, i) => (
                    <Text key={i} style={gameComponentStyles.playerStatusText}>❤️</Text>
                ))}
            </View>
        </View>
    );
};

const CenterCircle = ({char_set}: {char_set: string}) => (
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
        <Text style={gameComponentStyles.centerCircleText}>{char_set}</Text>
    </View>
);

const GameComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { players, current_turn, char_set, typing_text } = useSelector((state: RootState) => state.game);
    const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [winnerName, setWinnerName] = useState('');

    useEffect(() => {
        const handleUserJoined = (message: any) => {
            console.log('User joined:', message);
            
            if (message.type === 'user_joined') {
                const newUser: GameUser = {
                    user_id: message.payload.user_id,
                    user_name: message.payload.user_name,
                    lives: 3,
                };
                dispatch(addPlayer(newUser));
            }
        };

        const handleUserLeft = (message: any) => {
            console.log('User left:', message);
            
            if (message.type === 'user_left' || message.type === 'leave') {
                const userId = message.payload?.user_id || message.user_id;
                dispatch(removePlayer(userId));
            }
        };

        const handleTyping = (message: any) => {
            console.log('Typing:', message);

            if (message.type === 'typing') {
                dispatch(setTypingText(message.payload.text));
            }
        };

        const handleAnswer = (message: any) => {
            console.log('Answer:', message);

            if (message.type === 'answer') {
                dispatch(setTypingText(message.payload.answer));
                dispatch(setAnswerStatus(message.payload.correct));
            }
        };

        const handleTurnEnd = (message: any) => {
            console.log('Turn end:', message);

            if (message.type === 'turn_ended') {
                dispatch(setTypingText(''));
                dispatch(setAnswerStatus(null));
                dispatch(setLives({user_id: message.user_id || message.payload.user_id, lives: message.payload.lives_left}));
                dispatch(setScore({user_id: message.user_id || message.payload.user_id, score: message.payload.score}));
                dispatch(setRound(message.payload.round));
            }
        };

        const handleNextTurn = (message: any) => {
            console.log('Next turn:', message);

            if (message.type === 'next_turn') {
                dispatch(setCurrentTurn(message.payload.user_id));
                dispatch(setTypingText(''));
                dispatch(setAnswerStatus(null));
                dispatch(setCharSet(message.payload.char_set));
                dispatch(setRound(message.payload.round));
                dispatch(setTimeLimit(message.payload.time_limit));
            }
        };

        const handleGameOver = (message: any) => {
            console.log('Game over:', message);

            if (message.type === 'game_over') {
                dispatch(setWinnerId(message.payload.winner_id));
                setGameOverModalVisible(true);
                const winner = players.find(player => player.user_id === message.payload.winner_id);
                setWinnerName(winner ? winner.user_name : 'Unknown');
            }
        };

        gameWs.on('user_joined', handleUserJoined);
        gameWs.on('user_left', handleUserLeft);
        gameWs.on('leave', handleUserLeft);
        gameWs.on('typing', handleTyping);
        gameWs.on('answer', handleAnswer);
        gameWs.on('turn_ended', handleTurnEnd);
        gameWs.on('next_turn', handleNextTurn);
        gameWs.on('game_over', handleGameOver);

        return () => {
            gameWs.off('user_joined', handleUserJoined);
            gameWs.off('user_left', handleUserLeft);
            gameWs.off('leave', handleUserLeft);
            gameWs.off('typing', handleTyping);
            gameWs.off('answer', handleAnswer);
            gameWs.off('turn_ended', handleTurnEnd);
        };
    }, [dispatch]);

    return (
        <>
        {gameOverModalVisible && (
            <Modal
                visible={gameOverModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setGameOverModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 24,
                        alignItems: 'center',
                        minWidth: 250
                    }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>Game Over</Text>
                        <Text style={{ fontSize: 18, marginBottom: 24 }}>
                            Winner: <Text style={{ fontWeight: 'bold', color: '#4A0E72' }}>{winnerName}</Text>
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#4A0E72',
                                paddingVertical: 10,
                                paddingHorizontal: 32,
                                borderRadius: 8
                            }}
                            onPress={() => {
                                setGameOverModalVisible(false);
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'RoomChoice' }],
                                });
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16 }}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )}
            <View style={gameComponentStyles.outerContainer}>
                <View style={gameComponentStyles.boardContainer}>
                    <CenterCircle char_set={char_set} />
                    {players.map((player, idx) => (
                        <PlayerCircle key={player.user_id} player={player} idx={idx} total={players.length} isCurrentTurn={current_turn === player.user_id} typing_text={typing_text} />
                    ))}
                </View>
            </View>
        </>
    );  
};

export default GameComponent;