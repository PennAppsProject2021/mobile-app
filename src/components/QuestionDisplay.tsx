import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { fonts, measures } from '../styles';
import { Question } from '../types';
import CheckOption from './CheckOption';

type Props = {question: Question, onAnswer: (answer: unknown) => void}
function QuestionDisplay({question, onAnswer}: Props) {
    const [text, setText] = useState("");
    const [selectedMap, setSelectedMap] = useState<Record<string,boolean>>({});
    const [selectedRadio, setSelectedRadio] = useState("");

    useEffect(() => {
        const new_map: Record<string, boolean> = {};
        if(question.answer.type === 'multiselect') {
            question.answer.options.forEach(o => {
                new_map[o] = false;
            })
        }
        setSelectedMap(new_map);
    }, [question])

    return (
        <View style={styles.questionView}>
            <Text style={styles.questionText}>
                {question.prompt}
            </Text>
            {(question.answer.type === "string" || question.answer.type === "numeric") &&
                <TextInput
                    value={text}
                    onChangeText={t => {setText(t); onAnswer(t)}}
                    placeholder={question.prompt}
                    style={styles.textInput}
                    keyboardType={question.answer.type === "numeric" ? "number-pad" : "default"}
                />
            }
            {question.answer.type === "multiselect" && (
                <>
                    {question.answer.options.map(o => {
                        return (
                            <CheckOption
                                key={o}
                                selected={Object.keys(selectedMap).length > 0 && selectedMap[o]}
                                onSelect={() => {
                                    const nm = {...selectedMap};
                                    nm[o] = true;
                                    setSelectedMap(nm);
                                    onAnswer(Object.keys(selectedMap).filter(k => selectedMap[k]));
                                }}
                                onDeselect={() => {
                                    const nm = {...selectedMap};
                                    nm[o] = false;
                                    setSelectedMap(nm);
                                    onAnswer(Object.keys(selectedMap).filter(k => selectedMap[k]));
                                }} 
                                text={o} 
                            />
                        )
                    })}
                </>
            )
            }
            {question.answer.type === "multiradio" && (
                <>
                    {question.answer.options.map(o => {
                        return (
                            <CheckOption
                                key={o}
                                selected={o === selectedRadio}
                                onSelect={() => {setSelectedRadio(o); onAnswer(o)}}
                                onDeselect={() => null}
                                text={o}
                            />
                        )
                    })}
                </>
            )}
        </View>
    )
}

export default QuestionDisplay;

const styles = StyleSheet.create({
    questionView: {
        marginBottom: measures.margins.line * 1.5
    },
    questionText: {
        fontFamily: fonts.header,
        fontSize: measures.fonts.body,
        marginBottom: measures.margins.line / 4
    },
    textInput: {
        borderColor: "#ccc",
        borderRadius: measures.borderRadius,
        borderWidth: 1,
        fontFamily: fonts.body,
        padding: measures.margins.line / 2,
        marginTop: measures.margins.line/2,
        fontSize: measures.fonts.body - 2
    }
})