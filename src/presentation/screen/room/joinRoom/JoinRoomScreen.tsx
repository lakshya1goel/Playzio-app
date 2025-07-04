import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { FlatList, Text, TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import playzioLogo from '@assets/icons/playzio_logo.png';
import { joinRoomScreenStyles } from './JoinScreenScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const JoinRoomScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={joinRoomScreenStyles.container}>
            <Image source={playzioLogo} style={joinRoomScreenStyles.logo} />
            <Text style={joinRoomScreenStyles.headerText}>Join a Room</Text>
            <Text style={joinRoomScreenStyles.titleText}>Enter Room Code</Text>
            <TextInput style={joinRoomScreenStyles.input} placeholder="Room Code" placeholderTextColor="#4A0E72" />
            <TouchableOpacity style={joinRoomScreenStyles.button} onPress={() => navigation.navigate('Game')}>
                <Text style={joinRoomScreenStyles.buttonText}>Join Room</Text>
            </TouchableOpacity>
            <View style={joinRoomScreenStyles.orContainer}>
                <View style={joinRoomScreenStyles.orLine} />
                <Text style={joinRoomScreenStyles.orText}>OR</Text>
                <View style={joinRoomScreenStyles.orLine} />
            </View>
            <View style={joinRoomScreenStyles.outerContainer}>
            <FlatList
                data={['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5', 'Room 6', 'Room 7', 'Room 8', 'Room 9', 'Room 10']}
                renderItem={({ item }) => (
                    <View style={joinRoomScreenStyles.itemContainer}>
                        <Text style={joinRoomScreenStyles.itemText}>{item}</Text>
                        <TouchableOpacity style={joinRoomScreenStyles.joinButton}>
                            <Text style={joinRoomScreenStyles.joinButtonText}>Join</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
            </View>
        </SafeAreaView>
    );  
};

export default JoinRoomScreen;