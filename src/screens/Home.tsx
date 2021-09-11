import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderText from '../components/HeaderText';
import { useUserData } from '../context/UserDataProvider';
import { measures, colors } from '../styles';
import BodyText from '../components/BodyText';
import QRCodeScanner from 'react-native-qrcode-scanner';

function Home() {
    const {userData} = useUserData();
    
    useEffect(() => {
        // Poll data from Noah
    }, [])

    return (
        <View style={styles.container}>
            <HeaderText>
                {userData.name as string}
            </HeaderText>
            <BodyText>
                When you're ready to check in to your appointment,
                center your provider's QR code below.
            </BodyText>
            <View style={styles.scannerView}>
                {/* <QRCodeScanner
                    onRead={(data) => {console.log(data)}}
                /> */}
            </View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        padding: measures.margins.gutter,
        backgroundColor: colors.bgLight,
        flex: 1
    },
    scannerView: {
        marginTop: measures.margins.gutter,
        borderRadius: measures.borderRadius,
        overflow: "hidden",
        flexGrow: 1
    }
})