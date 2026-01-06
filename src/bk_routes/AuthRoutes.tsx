import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import LoginScreen  from '@screens/Account/LoginScreen';
import SplashScreen from '@screens/Account/SplashScreen';

type AuthRoutes = {
  LoginScreen: undefined;
  SplashScreen: undefined;
  FormPessoaJuridicaScreen: undefined;
  FormPessoaFisicaScreen: undefined;
};

export type AuthNavigatorRoutesprops = NativeStackNavigationProp<AuthRoutes>;

const Stack = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
