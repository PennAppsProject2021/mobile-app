import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, ImagePropTypes } from "react-native";
import { colors, measures, fonts } from '../styles';

type Props = {
    navigation: {
        navigate: (s: string) => void
    }
}
function OnBoard(props: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.cta}>
                <Text style={styles.header_text}>
                    Welcome
                </Text>
                <Text style={styles.body_text}>
                    Tired of filling out forms? Just enter your information once,
                    and we'll take care of the rest. Always secure. Always in your
                    control.
                </Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity style={styles.get_started_button} onPress={() => props.navigation.navigate("CreatePasscode")}>
                    <Text style={styles.get_started_button_text}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OnBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        padding: measures.margins.gutter,
        backgroundColor: colors.bgLight
    },
    header_text: {
        fontSize: measures.fonts.header,
        marginBottom: measures.margins.line,
        fontFamily: fonts.header,
        color: colors.textDark
    },
    body_text: {
        fontSize: measures.fonts.body,
        fontFamily: fonts.body,
        color: colors.textDark
    },
    cta: {
        flexGrow: 1
    },
    controls: {

    },
    get_started_button: {
        backgroundColor: colors.green,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: measures.borderRadius,
        padding: measures.fonts.button - 4,
        elevation: 6
    },
    get_started_button_text: {
        color: colors.textLight,
        fontSize: measures.fonts.button,
        fontFamily: fonts.body
    }
});