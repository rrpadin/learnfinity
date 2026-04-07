import PocketBase from 'pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl =
  process.env.EXPO_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

const storageKey = 'learnfinity.auth';

export const pb = new PocketBase(baseUrl);

let bootstrapped = false;

export async function bootstrapAuth() {
  if (bootstrapped) {
    return;
  }

  const raw = await AsyncStorage.getItem(storageKey);
  if (raw) {
    try {
      const { token, model } = JSON.parse(raw);
      pb.authStore.save(token, model);
    } catch (error) {
      console.warn('Failed to restore auth state', error);
      await AsyncStorage.removeItem(storageKey);
    }
  }

  pb.authStore.onChange(async (token, model) => {
    if (token) {
      await AsyncStorage.setItem(storageKey, JSON.stringify({ token, model }));
      return;
    }

    await AsyncStorage.removeItem(storageKey);
  });

  bootstrapped = true;
}
