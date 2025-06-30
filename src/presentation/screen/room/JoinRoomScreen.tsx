import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList, Text, TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../../type';

const JoinRoomScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Image source={require('../../../../assets/icons/playzio_logo.png')} style={styles.logo} />
            <Text style={styles.headerText}>Join a Room</Text>
            <Text style={styles.titleText}>Enter Room Code</Text>
            <TextInput style={styles.input} placeholder="Room Code" placeholderTextColor="#4A0E72" />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
                <Text style={styles.buttonText}>Join Room</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.orLine} />
            </View>
            <View style={styles.outerContainer}>
            <FlatList
                data={['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5', 'Room 6', 'Room 7', 'Room 8', 'Room 9', 'Room 10']}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item}</Text>
                        <TouchableOpacity style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>Join</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
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
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#fff',
    },
    orText: {
        color: '#fff',
        fontSize: 16,
        marginHorizontal: 10,
    },
    joinButton: {
        padding: 10,
        backgroundColor: '#4A0E72',
        borderRadius: 15,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinButtonText: {
        color: '#fff',
    },
    outerContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        width: '90%',
        height: '40%',
        padding: 10,
    },
    itemContainer: {
        width: '95%',
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        color: '#000',
        fontSize: 16,
    },
});

export default JoinRoomScreen;