import { StyleSheet } from "react-native";

export const createRoomScreenStyles = StyleSheet.create({
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
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 4,
        marginBottom: 30,
        width: '80%',
        alignSelf: 'center',
    },
    toggleOption: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleOptionSelected: {
        backgroundColor: '#4A0E72',
        borderRadius: 15,
    },      
    toggleText: {
        color: '#4A0E72',
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleTextSelected: {
        color: '#fff',
    },
});