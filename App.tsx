import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { colors } from './src/styles/colors';
import Toast from 'react-native-toast-message';
import Loading from './src/components/Loading';
import MainStack from './src/navigation/routes/MainStack';
import { GlobalContextProvider } from './src/context/GlobalContextProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';
import { OneSignal } from 'react-native-onesignal';
import { SafeAreaView } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Roboto_500Medium,
  });

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  useEffect(() => {
    async function prepare() {
      try {
        // Inicialização do OneSignal
        if (Platform.OS !== 'web') {
          OneSignal.initialize('69f5f21c-670c-48bc-91fe-167fdbca809b');
          OneSignal.Notifications.requestPermission(false);
        }
      } catch (e) {
        console.warn('Error initializing app:', e);
        setError(String(e));
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (fontError) {
    console.error('Font loading error:', fontError);
  }

  if (!fontsLoaded || !appIsReady) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao inicializar o app: {error}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.content, { paddingTop: statusBarHeight }]}>
          <GlobalContextProvider>
            <MainStack />
            <Toast />
          </GlobalContextProvider>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
