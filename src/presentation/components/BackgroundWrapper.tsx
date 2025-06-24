import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

type Props = {
    children: React.ReactNode;
};

const BackgroundWrapper = ({ children }: Props) => {
    return (
        <ImageBackground
            source={require('../../../assets/images/background.png')}
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
