import { StyleSheet } from "react-native";

export const gameTimerComponentStyles = StyleSheet.create({
    timerContainer: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 10,
    },
    timerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});