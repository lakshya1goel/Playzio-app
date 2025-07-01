import React from 'react';
import { View } from 'react-native';
import { FlatList, Text, TextInput } from 'react-native-gesture-handler';
import { chatComponentStyles } from './ChatComponent.styles';

const ChatComponent = () => {
    return (
        <View style={chatComponentStyles.outerContainer}>
            <TextInput style={chatComponentStyles.input} placeholder="Message" placeholderTextColor="#4A0E72" />
            <View style={chatComponentStyles.innerContainer}>
                <FlatList
                    data={['Member 1', 'Member 2', 'Member 3', 'Member 4', 'Member 5', 'Member 6', 'Member 7', 'Member 8', 'Member 9', 'Member 10']}
                    renderItem={({ item }) => (
                        <View style={chatComponentStyles.itemContainer}>
                            <Text style={chatComponentStyles.itemText}>{item}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
                <View style={chatComponentStyles.chatContainer}>
                    <FlatList
                        data={['Message 1', 'Message 2', 'Message 3', 'Message 4', 'Message 5', 'Message 6', 'Message 7', 'Message 8', 'Message 9', 'Message 10']}
                        renderItem={({ item }) => (
                            <Text style={chatComponentStyles.chatText}>{item}</Text>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );  
};

export default ChatComponent;