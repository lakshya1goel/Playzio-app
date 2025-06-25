import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-gesture-handler';

const RoomChoiceScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.outerContainer}>
                <Image source={require('../../../../assets/icons/playzio_logo.png')} style={styles.logo} />
                <Text style={styles.welcomeText}>Welcome to the Playzio!</Text>
                <TouchableOpacity style={styles.guestButton}>
                    <Text style={styles.guestButtonText}>Create Room</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton}>
                    <Text style={styles.googleButtonText}>Join Room</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    outerContainer: {
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 70,
        width: '80%',
    },
    logo: {
        width: 150,
        height: 120,
        marginBottom: 10,
    },
    guestButton: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        width: '70%',
    },
    guestButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    googleButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: '70%',
    },
    googleButtonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    welcomeText: {
        marginBottom: 40,
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default RoomChoiceScreen;