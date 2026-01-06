import React from 'react';
import { AuthRoutes } from './AuthRoutes';
import { NavigationContainer } from '@react-navigation/native';

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
