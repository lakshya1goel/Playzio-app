import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList, Text, TextInput } from 'react-native-gesture-handler';

const ChatComponent = () => {
    return (
        <View style={styles.outerContainer}>
            <TextInput style={styles.input} placeholder="Message" placeholderTextColor="#4A0E72" />
            <View style={styles.innerContainer}>
                <FlatList
                    data={['Member 1', 'Member 2', 'Member 3', 'Member 4', 'Member 5', 'Member 6', 'Member 7', 'Member 8', 'Member 9', 'Member 10']}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.chatContainer}>
                    <FlatList
                        data={['Message 1', 'Message 2', 'Message 3', 'Message 4', 'Message 5', 'Message 6', 'Message 7', 'Message 8', 'Message 9', 'Message 10']}
                        renderItem={({ item }) => (
                            <Text style={styles.chatText}>{item}</Text>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );  
};

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
        height: '45%',
        borderTopWidth: 1,
        borderColor: '#fff',
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        margin: 2,
        color: '#4A0E72',
    },
    itemContainer: {
        padding: 10,
        backgroundColor: '#fff',
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        color: '#000',
        fontSize: 10,
    },
    chatContainer: {
        width: '60%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderLeftWidth: 1,
        borderColor: '#fff',
    },
    chatText: {
        color: '#fff',
        fontSize: 12,
        margin: 5,
    }
});

export default ChatComponent;