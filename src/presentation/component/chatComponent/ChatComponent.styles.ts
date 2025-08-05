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
    membersContainer: {
        width: '40%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    membersListContainer: {
        flex: 1,
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
    itemContainerCurrentTurn: {
        padding: 10,
        backgroundColor: '#FFD700',
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFA500',
    },
    itemText: {
        color: '#000',
        fontSize: 10,
    },
    itemTextCurrentTurn: {
        color: '#4A0E72',
        fontSize: 10,
        fontWeight: 'bold',
    },
    chatMessageContainer: {
        padding: 8,
        margin: 2,
        borderRadius: 5,
    },
    chatContainer: {
        width: '60%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderLeftWidth: 1,
        borderColor: '#fff',
    },
    chatMessageEven: {
        backgroundColor: 'rgba(74, 14, 114, 0.3)',
    },
    chatMessageOdd: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    chatText: {
        color: '#fff',
        fontSize: 12,
        margin: 5,
    },
    turnIndicator: {
        fontSize: 8,
        color: '#4A0E72',
        fontWeight: 'bold',
    }
});