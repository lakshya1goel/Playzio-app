import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import playzioLogo from '@assets/icons/playzio_logo.png';
import { createRoomScreenStyles } from './CreateRoomScreen.styles';

const CreateRoomScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [selectedPrivacy, setSelectedPrivacy] = useState<'public' | 'private'>('public');

    return (
        <View style={createRoomScreenStyles.container}>
            <Image source={playzioLogo} style={createRoomScreenStyles.logo} />
            <Text style={createRoomScreenStyles.headerText}>Create Your Room</Text>
            <Text style={createRoomScreenStyles.titleText}>Room Name</Text>
            <TextInput style={createRoomScreenStyles.input} placeholder="Room Name" placeholderTextColor="#4A0E72" />
            <Text style={createRoomScreenStyles.titleText}>Privacy Setting</Text>
            <View style={createRoomScreenStyles.toggleContainer}>
                <TouchableOpacity style={[createRoomScreenStyles.toggleOption, selectedPrivacy === 'public' && createRoomScreenStyles.toggleOptionSelected]}
                onPress={() => setSelectedPrivacy('public')}>
                    <Text style={[createRoomScreenStyles.toggleText, selectedPrivacy === 'public' && createRoomScreenStyles.toggleTextSelected]}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[createRoomScreenStyles.toggleOption, selectedPrivacy === 'private' && createRoomScreenStyles.toggleOptionSelected]}
                onPress={() => setSelectedPrivacy('private')}>
                    <Text style={[createRoomScreenStyles.toggleText, selectedPrivacy === 'private' && createRoomScreenStyles.toggleTextSelected]}>Private</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={createRoomScreenStyles.button} onPress={() => navigation.navigate('Game')}>
                <Text style={createRoomScreenStyles.buttonText}>Create Room</Text>
            </TouchableOpacity>
        </View>
    );  
};

export default CreateRoomScreen;