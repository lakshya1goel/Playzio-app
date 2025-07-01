import { StyleSheet } from "react-native";

export const chatComponentStyles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
        height: '45%',
        borderTopWidth: 1,
        borderColor: '#fff',
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        margin: 2,
        color: '#4A0E72',
    },
    itemContainer: {
        padding: 10,
        backgroundColor: '#fff',
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        color: '#000',
        fontSize: 10,
    },
    chatContainer: {
        width: '60%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderLeftWidth: 1,
        borderColor: '#fff',
    },
    chatText: {
        color: '#fff',
        fontSize: 12,
        margin: 5,
    }
});