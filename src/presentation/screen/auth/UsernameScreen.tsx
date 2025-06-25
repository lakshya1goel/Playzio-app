import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../../type';

const UsernameScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Image source={require('../../../../assets/icons/playzio_logo.png')} style={styles.logo} />
            <Text style={styles.headerText}>Enter Your Username</Text>
            <Text style={styles.titleText}>Username</Text>
            <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#4A0E72" />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoomChoice')} >
                <Text style={styles.buttonText}>Next</Text>
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
        width: 150,
        height: 120,
        marginBottom: 20,
    },
    headerText: {
        marginBottom: 40,
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderRadius: 15,
        backgroundColor: '#fff',
        color: '#4A0E72',
        padding: 10,
        paddingHorizontal: 20,
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
    button: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    titleText: {
        color: '#fff',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: '12%',
        marginBottom: 10,
    },
});

export default UsernameScreen;