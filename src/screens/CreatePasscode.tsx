import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Animated, TouchableOpacity } from "react-native";
import { measures, colors, fonts } from "../styles";
import HeaderText from "../components/HeaderText";
import BodyText from "../components/BodyText";
import Icon from 'react-native-vector-icons/EvilIcons'

type Props = {
    navigation: {
        navigate: (s: string) => void
    }
}
function CreatePasscode(props: Props) {
    const [pw, setPw] = useState("");
    const [pwc, setPwc] = useState("");

    const nextOpacity = useRef(new Animated.Value(0.5));

    useEffect(() => {
        const animation_new = Animated
            .timing(
                nextOpacity.current,
                {toValue: (pw != "" && pw == pwc) ? 1 : .5, duration: 150, useNativeDriver: false}
            );
        animation_new.start();
    }, [pw, pwc])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderText>
                    Create a Password
                </HeaderText>
                <TouchableOpacity onPress={() => props.navigation.navigate("EnterInformation")}>
                    <Animated.View style={[styles.icon, {opacity: nextOpacity.current}]}>
                        <Icon name="chevron-right" style={{fontSize: 42, color: 'white', marginLeft: -2}}/>
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <BodyText>
                We'll use this to make sure only you can access your information
                unless you choose to share it with a doctor.
            </BodyText>

            <Text style={styles.label}>
                Enter Password
            </Text>
            <TextInput
                value={pw}
                placeholder="Enter a password..."
                onChangeText={(t) => setPw(t)}
                style={styles.input}
                secureTextEntry
                autoFocus
            />
            <Text style={styles.label}>
                Confirm Password
            </Text>
            <TextInput
                value={pwc}
                placeholder="Confirm your password..."
                onChangeText={(t) => setPwc(t)}
                style={styles.input}
                secureTextEntry
            />
        </View>
    )
}

export default CreatePasscode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: measures.margins.gutter,
        backgroundColor: colors.bgLight
    },
    label: {
        marginTop: measures.margins.gutter,
        fontFamily: fonts.body,
        color: "#555",
        fontSize: 13,
        marginBottom: 5
    },
    input: {
        borderColor: "#ccc",
        borderRadius: measures.borderRadius,
        fontFamily: fonts.body,
        fontSize: measures.fonts.body,
        padding: measures.fonts.body - 4,
        borderWidth: 1,
        color: colors.textDark
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: colors.green,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_waiting: {
        opacity: 0.4
    }
})