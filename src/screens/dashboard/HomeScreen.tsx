import { useAuth } from '@hooks/useAuth';
import { getCopyright } from '@services/fetchCopyright';
import { getToken } from '@storage/token';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

export function HomeScreen() {
  const [token, setToken] = useState('');

  async function onGetToken() {
    const token = await getToken();
    setToken(token as string);
  }

  useEffect(() => {
    onGetToken();
  }, []);

  return (
    <View className="flex-1 justify-center items-center font-brand">
      <Text className="text-black">Home</Text>
      <Text className="text-black">{token}</Text>
    </View>
  );
}
