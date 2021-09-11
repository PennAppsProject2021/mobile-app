import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

function OnBoard() {
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
                <TouchableOpacity style={styles.get_started_button}>
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
        padding: 20
    },
    header_text: {
        fontSize: 32,
        marginBottom: 12
    },
    body_text: {
        fontSize: 18
    },
    cta: {
        flexGrow: 1
    },
    controls: {

    },
    get_started_button: {
        backgroundColor: "#3EB595",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        padding: 16
    },
    get_started_button_text: {
        color: "#FFFFFF",
        fontSize: 20
    }
});