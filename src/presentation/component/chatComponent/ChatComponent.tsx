import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList, Text, TextInput } from 'react-native-gesture-handler';
import { chatComponentStyles } from './ChatComponent.styles';
import gameWs from '@/service/GameWebsocketService';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { CHAT_MESSAGE_TYPES, Message } from '@/store/types/websocket';
import chatWs from '@/service/ChatWebsocketService';

const ChatComponent = () => {
    const [message, setMessage] = useState<string>('');
    const { current_turn } = useSelector((state: RootState) => state.game);
    const { user_id } = useSelector((state: RootState) => state.auth);
    const { room } = useSelector((state: RootState) => state.room);
    const [messages, setMessages] = useState<Message[]>([]);

    const isMyTurn = user_id === current_turn;
    console.log("isMyTurn, user_id, current_turn", isMyTurn, user_id, current_turn);

    useEffect(() => {
        const handleIncomingMessage = (data: any) => {            
            const newMessage = {
                ID: Date.now().toString(),
                CreatedAt: new Date().toISOString(),
                UpdatedAt: new Date().toISOString(),
                DeletedAt: null,
                type: CHAT_MESSAGE_TYPES.CHAT_CONTENT,
                body: data.body,
                sender: data.sender,
                room_id: room?.ID,
            };
            
            setMessages(prev => [...prev, newMessage as Message]);
        };

        chatWs.setMessageListener(handleIncomingMessage);

        return () => {
            chatWs.setMessageListener(null);
        };
    }, [room?.ID]);

    const handleSendMessage = () => {
        if (message.trim().length > 0 && !isMyTurn) {
            chatWs.sendMessage(message);
            setMessage('');
        }
    };

    const renderMember = ({ item, index }: { item: any; index: number }) => {
        const isCurrentTurn = current_turn === item.user_id;
        
        return (
            <View style={isCurrentTurn ? chatComponentStyles.itemContainerCurrentTurn : chatComponentStyles.itemContainer}>
                <Text style={isCurrentTurn ? chatComponentStyles.itemTextCurrentTurn : chatComponentStyles.itemText}>
                    {item.user_name}
                </Text>
                {isCurrentTurn && (
                    <Text style={chatComponentStyles.turnIndicator}>🔥 TURN</Text>
                )}
            </View>
        );
    };

    const renderChatMessage = ({ item, index }: { item: Message; index: number }) => {
        const isEven = index % 2 === 0;
        
        return (
            <View style={[
                chatComponentStyles.chatMessageContainer,
                isEven ? chatComponentStyles.chatMessageEven : chatComponentStyles.chatMessageOdd
            ]}>
                <Text style={chatComponentStyles.chatText}>{item.body}</Text>
            </View>
        );
    };

    return (
        <View style={chatComponentStyles.outerContainer}>
            <TextInput
                style={chatComponentStyles.input}
                placeholder="Message"
                placeholderTextColor="#4A0E72"
                value={message}
                onChangeText={(text) => {
                    setMessage(text);
                    if (text.trim().length > 0 && isMyTurn) {
                        gameWs.typing(text);
                    }
                }}
                onSubmitEditing={() => {
                    if (message.trim().length > 0 && isMyTurn) {
                        gameWs.answer(message);
                        setMessage('');
                    }
                    if (message.trim().length > 0 && !isMyTurn) {
                        handleSendMessage();
                    }
                }}
                returnKeyType="send"
            />
            <View style={chatComponentStyles.innerContainer}>
                <View style={chatComponentStyles.membersContainer}>
                    <FlatList
                        style={chatComponentStyles.membersListContainer}
                        data={room?.members}
                        renderItem={renderMember}
                        keyExtractor={(item) => item.ID.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
                    />
                </View>
                <View style={chatComponentStyles.chatContainer}>
                    <FlatList
                        data={messages}
                        renderItem={renderChatMessage}
                        keyExtractor={(item) => item.ID}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
                    />
                </View>
            </View>
        </View>
    );  
};

export default ChatComponent;