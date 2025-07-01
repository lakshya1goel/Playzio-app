import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '@type';
import playzioLogo from '@assets/icons/playzio_logo.png';
import { createRoomScreenStyles } from './CreateRoomScreen.styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import showErrorMessage from '@/presentation/component/ErrorDialog';
import { createRoom } from '@/store/slices/roomSlice';

const CreateRoomScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [selectedPrivacy, setSelectedPrivacy] = useState<'public' | 'private'>('public');
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, success } = useSelector((state: RootState) => state.room);
    const [name, setName] = useState('');

    useEffect(() => {
        if (error) {
            showErrorMessage(error);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            navigation.navigate('Game');
        }
    }, [success]);

    const validate = (): boolean => {
        if (!name) {
            showErrorMessage('Please enter a room name');
            return false;
        }
        return true;
    };

    const handleCreateRoom = async () => {
        if (!validate()) return;
        const room = {
            name: name,
            type: selectedPrivacy,
        }
        await dispatch(createRoom(room)).unwrap();
    };

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
            <TouchableOpacity style={createRoomScreenStyles.button} onPress={handleCreateRoom}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={createRoomScreenStyles.buttonText}>Create Room</Text>
                )}
            </TouchableOpacity>
        </View>
    );  
};

export default CreateRoomScreen;