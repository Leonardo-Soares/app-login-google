import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'br-bredi-discountapp',
  name: 'Discontapp',
  version: '1.3.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: "discountapp",
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#fff',
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
    versionCode: 300,
    package: 'br.bredi.discountapp',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-font',
    [
      'react-native-vision-camera',
      { enableCodeScanner: true },
    ],
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

