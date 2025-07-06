import { StyleSheet } from "react-native";

export const PLAYER_SIZE = 50;
export const CENTER_SIZE = 80;
export const RADIUS = 130;
export const CENTER_X = 180;
export const CENTER_Y = 120;

export const gameComponentStyles = StyleSheet.create({
    outerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        height: '55%',
    },
    boardContainer: {
        width: 360,
        height: 240,
        position: 'relative',
    },
    playerCircleContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    playerName: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 2,
        marginTop: 0,
    },
    avatarContainer: {
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        borderRadius: PLAYER_SIZE / 2,
        backgroundColor: '#4A0E72',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        overflow: 'hidden',
    },
    avatar: {
        width: PLAYER_SIZE - 8,
        height: PLAYER_SIZE - 8,
        borderRadius: (PLAYER_SIZE - 8) / 2,
        resizeMode: 'cover',
    },
    centerCircleContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        backgroundColor: 'transparent',
    },
    centerCircleImage: {
        width: CENTER_SIZE,
        height: CENTER_SIZE,
    },
    centerCircleText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        zIndex: 1,
    },
});