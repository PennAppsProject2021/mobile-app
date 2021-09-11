import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { measures, fonts, colors } from '../styles';

type Props = {
    children: string
}
function HeaderText({children}: Props) {
    return  (
        <Text style={styles.header_text}>
            {children}
        </Text>
    )
};

export default HeaderText;

const styles = StyleSheet.create({
    header_text: {
        fontSize: measures.fonts.header,
        marginBottom: measures.margins.line,
        fontFamily: fonts.header,
        color: colors.textDark
    },
})