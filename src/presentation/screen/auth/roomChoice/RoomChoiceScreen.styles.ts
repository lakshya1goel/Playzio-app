import { StyleSheet } from "react-native";

export const roomChoiceScreenStyles = StyleSheet.create({
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
        marginBottom: 10,
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
        fontSize: 16,
    },
    headerText: {
        marginBottom: 40,
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
});