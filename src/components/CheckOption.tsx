import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import { measures, fonts, colors } from '../styles';

type Props = {
    selected: boolean,
    text: string,
    onSelect: () => void,
    onDeselect: () => void
}
function CheckOption({selected, text, onSelect, onDeselect} : Props) {
    const status = useRef(new Animated.Value(selected ? 1 : 0));

    useEffect(() => {
        Animated.timing(status.current, {toValue: selected ? 1 : 0, duration: 75, useNativeDriver: false}).start();
    }, [selected]);

    const bgColor = status.current.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.bgLight, colors.textDark]
    });

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {
                if(selected) {
                    onDeselect();
                } else {
                    onSelect();
                }
            }}>
                <Animated.View style={[styles.checkContainer, {backgroundColor: bgColor}]}/>
            </TouchableWithoutFeedback>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default CheckOption;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: measures.margins.line / 2,
        alignItems: 'center'
    },
    text: {
        marginLeft: measures.margins.line / 2,
        fontSize: measures.fonts.body - 2,
        fontFamily: fonts.body
    },
    checkContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.textDark
    }
})