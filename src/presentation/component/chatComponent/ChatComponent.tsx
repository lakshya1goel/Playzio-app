import React, { useState } from 'react';
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

    const handleSendMessage = () => {
        if (message.trim().length > 0 && !isMyTurn) {
            const tempMessage = {
                ID: Date.now().toString(),
                CreatedAt: new Date().toISOString(),
                UpdatedAt: new Date().toISOString(),
                DeletedAt: null,
                type: CHAT_MESSAGE_TYPES.CHAT_CONTENT,
                body: message,
                sender: user_id,
                room_id: room?.ID,
            };
            setMessages([...messages, tempMessage as Message]);
            chatWs.sendMessage(JSON.stringify(tempMessage));
            setMessage('');
        }
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
                editable={isMyTurn}
            />
            <View style={chatComponentStyles.innerContainer}>
                <FlatList
                    data={room?.members}
                    renderItem={({ item }) => (
                        <View style={chatComponentStyles.itemContainer}>
                            <Text style={chatComponentStyles.itemText}>{item.user_name}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.ID.toString()}
                    showsVerticalScrollIndicator={false}
                />
                <View style={chatComponentStyles.chatContainer}>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <Text style={chatComponentStyles.chatText}>{item.body}</Text>
                        )}
                        keyExtractor={(item) => item.ID}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );  
};

export default ChatComponent;