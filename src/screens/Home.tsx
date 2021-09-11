import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderText from '../components/HeaderText';
import { useUserData } from '../context/UserDataProvider';
import { measures, colors } from '../styles';
import BodyText from '../components/BodyText';

function Home() {
    const {userData} = useUserData();
    return (
        <View style={styles.container}>
            <HeaderText>
                {userData.name as string}
            </HeaderText>
            <BodyText>
                When you're ready to check in to your appointment,
                center your provider's QR code below.
            </BodyText>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        padding: measures.margins.gutter,
        backgroundColor: colors.bgLight,
        flex: 1
    }
})