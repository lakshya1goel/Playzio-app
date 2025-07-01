import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import backgroundImage from '@assets/images/background.png';

type Props = {
    children: React.ReactNode;
};

const BackgroundWrapper = ({ children }: Props) => {
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="cover"
        >
        {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default BackgroundWrapper;
