import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-gesture-handler';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../../../assets/icons/playzio_logo.png')} style={styles.logo} />
            <TouchableOpacity style={styles.guestButton}>
                <Text style={styles.guestButtonText}>Play as guest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
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
    logo: {
        width: 200,
        height: 200,
    },
    guestButton: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        width: '50%',
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
        width: '50%',
    },
    googleButtonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default LoginScreen;