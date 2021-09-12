import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import HeaderText from '../components/HeaderText';
import { useUserData } from '../context/UserDataProvider';
import { measures, colors, fonts } from '../styles';
import BodyText from '../components/BodyText';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from 'react-native-modal';
import EncryptedStorage from 'react-native-encrypted-storage';
import { encrypt } from '../util/encryption';
import { retrieve } from '../util/storage';
import { IKeyPair } from 'react-native-virgil-crypto';

type Study = {
    Timestamp: number,
    University: string,
    X: Record<string,unknown>
}

function Home() {
    const {userData} = useUserData();
    const seen = useRef(new Set<number>());
    const [study, setStudy] = useState<Study|undefined>();
    const [shareUp, setShareUp] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            const ms = Date.now();
            fetch("http://10.0.2.2:5000/studiesRequest").then(data => data.json()).then(j => {
                // Assume no more than one study added in a half-second interval
                if(Object.keys(j).length > 0) {
                    // Get permission
                    const most_recent = j[Object.keys(j)[Object.keys(j).length-1]] as Study;
                    // Hardcode for reproducible demo
                    startPrompt(most_recent);
                }
            }).catch(e => {
                console.log(e);
            })
        }, 500)
    }, []);

    const startPrompt = (s: Study) => {
        setStudy(s);
    }

    const dismiss = () => {
        setStudy(undefined);
    }

    const save = () => {
        setStudy(undefined);
        // Hardcode for demo
        fetch("http://10.0.2.2:5000/mobileRequest", {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({X: {"a": "b"}, Y: {"C": "d"}})
        });
    }

    const eraseStorage = () => {
        EncryptedStorage.setItem("health_data", "");
    }

    const share = () => {
        retrieve("health_data").then(data => {
            const enc = encrypt(JSON.stringify(data), dref.current as unknown as IKeyPair['publicKey']);
            fetch("http://10.0.2.2./upload", {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({[dref.current as string]: enc})
            })
        })
    }

    const dref = useRef<string>();

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={eraseStorage}>
                <HeaderText>
                    {userData.name as string}
                </HeaderText>
            </TouchableWithoutFeedback>
            <BodyText>
                When you're ready to check in to your appointment,
                center your provider's QR code below.
            </BodyText>
            <View style={styles.scannerView}>
                <QRCodeScanner
                    onRead={(data) => {setShareUp(true); dref.current = data.rawData;}}
                />
            </View>
            <Modal isVisible={study != undefined}>
                <View style={styles.modalContents}>
                    <View style={{flexGrow: 1}}>
                        <HeaderText>
                            You're eligible to participate in a new study.
                        </HeaderText>
                        <BodyText>
                            This study is conducted by researchers at Stanford University.
                            They will receive your data temporarily for the study,
                            after which it will be deleted. Would you like to participate?
                        </BodyText>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.get_started_button, {marginRight: 10, backgroundColor: "#F03220"}]} onPress={dismiss}>
                            <Text style={styles.get_started_button_text}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.get_started_button, {marginLeft: 10}]} onPress={save}>
                            <Text style={styles.get_started_button_text}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal isVisible={shareUp}>
                <View style={styles.modalContents}>
                    <View style={{flexGrow: 1}}>
                        <HeaderText>
                            Share History
                        </HeaderText>
                        <BodyText>
                            Would you like to share your medical history
                            with this provider? Make sure you trust the provider 
                            and are physically viewing this QR code.
                        </BodyText>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.get_started_button, {marginRight: 10, backgroundColor: "#F03220"}]} onPress={() => setShareUp(false)}>
                            <Text style={styles.get_started_button_text}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.get_started_button, {marginLeft: 10}]} onPress={() => {setShareUp(false); share()}}>
                            <Text style={styles.get_started_button_text}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    modalContents: {
        backgroundColor: colors.bgLight,
        borderRadius: measures.borderRadius,
        margin: measures.margins.gutter,
        padding: measures.margins.gutter,
        flex: 1
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
        flexGrow: 1
    },
    get_started_button_text: {
        color: colors.textLight,
        fontSize: measures.fonts.button,
        fontFamily: fonts.body
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
})