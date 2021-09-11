import React, { ReactNode } from 'react';
import {Text, StyleSheet} from 'react-native';
import { measures, fonts, colors } from '../styles';

type Props = {
    children: ReactNode
}
function BodyText({children}: Props) {
    return  (
        <Text style={styles.body_text}>
            {children}
        </Text>
    )
};

export default BodyText;

const styles = StyleSheet.create({
    body_text: {
        fontSize: measures.fonts.body,
        fontFamily: fonts.body,
        color: colors.textDark
    },
})