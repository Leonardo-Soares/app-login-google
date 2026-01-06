import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './AuthRoutes';
import useAuthenticatedStore from '@stores/useAuthenticatedStore';

export function Routes() {
  const { isAuthenticated } = useAuthenticatedStore();
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
