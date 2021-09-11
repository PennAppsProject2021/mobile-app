import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, Animated } from 'react-native';
import { colors, measures, fonts } from '../styles';
import HeaderText from '../components/HeaderText';
import BodyText from '../components/BodyText';
import { Question } from '../types';
import QuestionDisplay from '../components/QuestionDisplay';
import Icon from 'react-native-vector-icons/EvilIcons'
import { store } from '../util/storage';

const questions: Question[] = [
    {
        prompt: "What is your name?",
        answer: {type: "string"},
        id: "name"
    },
    {
        prompt: "What is your age?",
        answer: {type: "numeric"},
        id: "age"
    },
    {
        prompt: "What is your gender?",
        answer: {type: "multiradio", options: ["Male", "Female", "Nonbinary", "Other"]},
        id: "gender"
    },
    {
        prompt: "What is your race?",
        answer: {type: "multiselect", options: ["Caucasian", "African American", "Asian", "Native American", "Hispanic", "Other"]},
        id: "race"
    },
    {
        prompt: "What is your height?",
        answer: {type: "numeric"},
        id: "height"
    },
    {
        prompt: "What is your weight?",
        answer: {type: "numeric"},
        id: "weight"
    },
    {
        prompt: "Have you been infected with COVID-19?",
        answer: {type: "multiradio", options: ["Yes", "No"]},
        id: "had_c19_infection"
    },
    {
        prompt: "Have you been hospitalized for COVID-19?",
        answer: {type: "multiradio", options: ["Yes", "No"]},
        id: "had_c19_hospitalization"
    }
]

function EnterInformation() {
    const answers = useRef<Record<string,unknown>>({});
    const [validAnswers, setValidAnswers] = useState(0);
    
    const buttonOpacity = useRef(new Animated.Value(0.5));

    useEffect(() => {
        Animated.timing(buttonOpacity.current, {toValue: validAnswers === questions.length ? 1 : 0.5, duration: 200, useNativeDriver: false}).start();
    }, [validAnswers]);

    const next = () => {
        store("health_data", answers.current).then(() => {
            // stored, should navigate to next page
        });
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <View style={styles.spacer}/>
                <View style={styles.header}>
                    <HeaderText>
                        Your Information
                    </HeaderText>
                    <TouchableOpacity disabled={validAnswers != questions.length}>
                        <Animated.View style={[styles.icon, {opacity: buttonOpacity.current}]}>
                            <Icon name="chevron-right" style={{fontSize: 42, color: 'white', marginLeft: -2}}/>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                <BodyText>
                    We'll encrypt your medical history and store it on your device.
                    When you're ready to share it with a provider, we'll send
                    them an encrypted copy, too.
                </BodyText>
                <View style={styles.spacer}/>
                {questions.map(q => {
                    return (
                        <QuestionDisplay question={q} key={q.prompt} onAnswer={(answer) => {
                            if(q.answer.type === "string" || q.answer.type === "numeric") {
                                const ans2 = answer as string;
                                if(ans2 != "") {
                                    answers.current[q.id] = ans2;
                                } else {
                                    answers.current[q.id] = undefined;
                                }
                            } else if (q.answer.type === "multiselect") {
                                const ans2 = answer as string[];
                                if(ans2.length > 0) {
                                    answers.current[q.id] = ans2;
                                } else {
                                    answers.current[q.id] = undefined;
                                }
                            } else if (q.answer.type === "multiradio") {
                                const ans2 = answer as string;
                                if(ans2 != "") {
                                    answers.current[q.id] = ans2;
                                } else {
                                    answers.current[q.id] = undefined;
                                }
                            }
                            setValidAnswers(Object.keys(answers.current).map(k => answers.current[k] != undefined).length);
                        }}/>
                    )
                })}
                <TouchableOpacity disabled={validAnswers != questions.length}>
                    <Animated.View style={[styles.get_started_button, {opacity: buttonOpacity.current}]}>
                        <Text style={styles.get_started_button_text}>Get Started</Text>
                    </Animated.View>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EnterInformation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgLight,
        padding: measures.margins.gutter,
        paddingBottom: 0,
        paddingTop: 0
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    spacer: {
        height: measures.margins.gutter
    },
    get_started_button: {
        backgroundColor: colors.green,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: measures.borderRadius,
        padding: measures.fonts.button - 4,
        elevation: 6,
        marginBottom: measures.margins.gutter
    },
    get_started_button_text: {
        color: colors.textLight,
        fontSize: measures.fonts.button,
        fontFamily: fonts.body
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
})