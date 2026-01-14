import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'br-bredi-discountapp',
  name: 'yourapp',
  version: '0.0.1',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: "discountapp",
  userInterfaceStyle: 'dark',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'br.bredi.discountapp',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'br.bredi.discountapp',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-font',
    [
      "@react-native-google-signin/google-signin",
      {
        "iosUrlScheme": "com.googleusercontent.apps.729042460039-94o2afcsqiosc4nuddq3b067pt9upda4"
      }
    ]
  ],
  extra: {
    eas: {
      projectId: '27b767cc-a1b5-428f-b4e8-a5e7d35be0c3',
    },
  },
});

