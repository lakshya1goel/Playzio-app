import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../../type';

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <View style={styles.outerContainer}>
                <Image source={require('../../../../assets/icons/playzio_logo.png')} style={styles.logo} />
                <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Username')}>
                    <Text style={styles.guestButtonText}>Play as guest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('RoomChoice')}>
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
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
        borderRadius: 50,
        width: '80%',
    },
    logo: {
        width: 150,
        height: 120,
        marginBottom: 20,
    },
    guestButton: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
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
        borderRadius: 15,
        width: '70%',
    },
    googleButtonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default LoginScreen;