import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, Modal, TouchableOpacity, Animated } from 'react-native';
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
import { handleUserJoinedMessage, handleUserLeftMessage, handleTypingMessage, handleAnswerMessage, handleTurnEndMessage, handleNextTurnMessage, handleGameOverMessage } from '@/store/slices/gameSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@type';
import { MESSAGE_TYPES } from '@/store/types/websocket';
import { Member } from '@/store/types/room';
import { addMemberToRoom } from '@/store/slices/roomSlice';

const defaultPlayerImages = [
    player1, player2, player3, player4, player5,
    player6, player7, player8, player9, player10
];

const PlayerCircle = ({ 
    player, 
    idx, 
    total, 
    isCurrentTurn, 
    typing_text,
    previousLives,
    onLifeChange 
}: { 
    player: GameUser, 
    idx: number, 
    total: number, 
    isCurrentTurn: boolean, 
    typing_text: string,
    previousLives: number,
    onLifeChange: (playerId: number, newLives: number) => void
}) => {
    const angle = (2 * Math.PI * idx) / total;
    const x = CENTER_X + RADIUS * Math.cos(angle) - PLAYER_SIZE / 2;
    const y = CENTER_Y + RADIUS * Math.sin(angle) - PLAYER_SIZE / 2;

    const image = defaultPlayerImages[idx % defaultPlayerImages.length];
    
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const lifeShakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isCurrentTurn) {
            const pulseAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            );
            
            const glowAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])
            );

            pulseAnimation.start();
            glowAnimation.start();

            return () => {
                pulseAnimation.stop();
                glowAnimation.stop();
            };
        } else {
            pulseAnim.setValue(1);
            glowAnim.setValue(0);
        }
    }, [isCurrentTurn]);

    useEffect(() => {
        if (previousLives > (player.lives || 0)) {
            const shakeAnimation = Animated.sequence([
                Animated.timing(lifeShakeAnim, {
                    toValue: 10,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(lifeShakeAnim, {
                    toValue: -10,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(lifeShakeAnim, {
                    toValue: 10,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(lifeShakeAnim, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]);

            const scaleAnimation = Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 0.8,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]);

            Animated.parallel([shakeAnimation, scaleAnimation]).start();
            onLifeChange(player.user_id, player.lives || 0);
        }
    }, [player.lives]);

    return (
        <Animated.View
            key={player.user_id}
            style={[
                gameComponentStyles.playerCircleContainer,
                {
                    left: x,
                    top: y,
                    width: PLAYER_SIZE,
                    height: PLAYER_SIZE + 40,
                    transform: [
                        { scale: pulseAnim },
                        { translateX: lifeShakeAnim },
                        { scale: scaleAnim }
                    ],
                },
            ]}
        >
            {/* Glow effect for current turn */}
            {isCurrentTurn && (
                <Animated.View
                    style={[
                        gameComponentStyles.pulseGlow,
                        {
                            opacity: glowAnim,
                        }
                    ]}
                />
            )}

            {/* Turn indicator */}
            {isCurrentTurn && (
                <View style={gameComponentStyles.turnIndicator}>
                    <Text style={gameComponentStyles.turnIndicatorText}>YOUR TURN</Text>
                </View>
            )}

            {/* Typing indicator */}
            {isCurrentTurn && typing_text && (
                <View style={gameComponentStyles.typingContainer}>
                    <Text style={gameComponentStyles.typingText}>
                        {typing_text.length > 15 ? typing_text.substring(0, 15) + '...' : typing_text}
                    </Text>
                </View>
            )}

            <View style={isCurrentTurn ? gameComponentStyles.avatarContainerCurrentTurn : gameComponentStyles.avatarContainer}>
                <Image 
                    source={image} 
                    style={isCurrentTurn ? gameComponentStyles.avatarCurrentTurn : gameComponentStyles.avatar} 
                />
            </View>
            
            <Text style={isCurrentTurn ? gameComponentStyles.playerNameCurrentTurn : gameComponentStyles.playerName}>
                {player.user_name} {isCurrentTurn ? '🔥' : ''}
            </Text>
            
            <View style={gameComponentStyles.playerStatusContainer}>
                {Array.from({ length: player.lives || 0 }).map((_, i) => (
                    <Text key={i} style={gameComponentStyles.playerStatusText}>❤️</Text>
                ))}
            </View>
        </Animated.View>
    );
};

const CenterCircle = ({ char_set }: { char_set: string }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const rotateAnimation = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true,
            })
        );
        rotateAnimation.start();

        return () => rotateAnimation.stop();
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
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
            <Animated.Image
                source={bomb}
                style={[
                    gameComponentStyles.centerCircleImage,
                    { transform: [{ rotate }] }
                ]}
                resizeMode="cover"
            />
            <Text style={gameComponentStyles.centerCircleText}>{char_set}</Text>
        </View>
    );
};

const GameComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { players, current_turn, char_set, typing_text } = useSelector((state: RootState) => state.game);
    const { room } = useSelector((state: RootState) => state.room);
    const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
    const [playerLives, setPlayerLives] = useState<{ [key: number]: number }>({});
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [winnerName, setWinnerName] = useState('');

    useEffect(() => {
        const livesMap: { [key: number]: number } = {};
        players.forEach(player => {
            livesMap[player.user_id] = player.lives || 0;
        });
        setPlayerLives(livesMap);
    }, [players]);

    const handleLifeChange = (playerId: number, newLives: number) => {
        setPlayerLives(prev => ({
            ...prev,
            [playerId]: newLives
        }));
    };

    useEffect(() => {
        const handleUserJoined = (message: any) => {
            console.log('User joined:', message);
            dispatch(handleUserJoinedMessage(message.payload));

            if (message.payload && room) {
                const newMember: Member = {
                    ID: Date.now(),
                    room_id: room.ID,
                    user_id: message.payload.user_id,
                    user_name: message.payload.user_name,
                    user: {
                        id: message.payload.user_id,
                        name: message.payload.user_name,
                        email: '',
                        profile_pic: '',
                        access_token: '',
                        access_token_exp: 0,
                        refresh_token: '',
                        refresh_token_exp: 0,
                    },
                    guest_id: '',
                    guest_name: '',
                    is_creator: false,
                };
                dispatch(addMemberToRoom(newMember));
            }
        };

        const handleUserLeft = (message: any) => {
            console.log('User left:', message);
            dispatch(handleUserLeftMessage(message.payload));
        };

        const handleTyping = (message: any) => {
            console.log('Typing:', message);
            dispatch(handleTypingMessage(message.payload));
        };

        const handleAnswer = (message: any) => {
            console.log('Answer:', message);
            dispatch(handleAnswerMessage(message.payload));
        };

        const handleTurnEnd = (message: any) => {
            console.log('Turn end:', message);
            dispatch(handleTurnEndMessage(message.payload));
        };

        const handleNextTurn = (message: any) => {
            console.log('Next turn:', message);
            dispatch(handleNextTurnMessage(message.payload));
        };

        const handleGameOver = (message: any) => {
            console.log('Game over:', message);
            dispatch(handleGameOverMessage(message.payload));
            setGameOverModalVisible(true);
            const winner = players.find(player => player.user_id === message.payload.winner_id);
            setWinnerName(winner ? winner.user_name : 'Unknown');
        };

        gameWs.on(MESSAGE_TYPES.USER_JOINED, handleUserJoined);
        gameWs.on(MESSAGE_TYPES.USER_LEFT, handleUserLeft);
        gameWs.on(MESSAGE_TYPES.TYPING, handleTyping);
        gameWs.on(MESSAGE_TYPES.ANSWER, handleAnswer);
        gameWs.on(MESSAGE_TYPES.TURN_ENDED, handleTurnEnd);
        gameWs.on(MESSAGE_TYPES.NEXT_TURN, handleNextTurn);
        gameWs.on(MESSAGE_TYPES.GAME_OVER, handleGameOver);

        return () => {
            gameWs.off(MESSAGE_TYPES.USER_JOINED, handleUserJoined);
            gameWs.off(MESSAGE_TYPES.USER_LEFT, handleUserLeft);
            gameWs.off(MESSAGE_TYPES.TYPING, handleTyping);
            gameWs.off(MESSAGE_TYPES.ANSWER, handleAnswer);
            gameWs.off(MESSAGE_TYPES.TURN_ENDED, handleTurnEnd);
            gameWs.off(MESSAGE_TYPES.NEXT_TURN, handleNextTurn);
            gameWs.off(MESSAGE_TYPES.GAME_OVER, handleGameOver);
        };
    }, [dispatch, players]);

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
                        <PlayerCircle 
                            key={player.user_id} 
                            player={player} 
                            idx={idx} 
                            total={players.length} 
                            isCurrentTurn={current_turn === player.user_id} 
                            typing_text={typing_text}
                            previousLives={playerLives[player.user_id] || 0}
                            onLifeChange={handleLifeChange}
                        />
                    ))}
                </View>
            </View>
        </>
    );  
};

export default GameComponent;