import EncryptedStorage from 'react-native-encrypted-storage';

async function store(key: string, data: Record<string, unknown>) {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
}

async function retrieve(key: string) {
    return EncryptedStorage.getItem(key).then(data => JSON.parse(data as string));
}

export {store, retrieve};