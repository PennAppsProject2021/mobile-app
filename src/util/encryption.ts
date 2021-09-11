import { virgilCrypto, IKeyPair } from 'react-native-virgil-crypto';

function encrypt(data: string, key: IKeyPair['publicKey']): string {
    const encryptedData = virgilCrypto.encrypt(data,key);
    return encryptedData.toString('base64');
}

function decrypt(data: string, key: IKeyPair['privateKey']): string {
    const decryptedData = virgilCrypto.decrypt(data, key);
    return decryptedData.toString('utf-8');
}

export {encrypt, decrypt};