import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { setUnauthorizedHandler } from '../api/client';
import { Loader } from '../components/common/Loader';
import { useAuth } from '../store/authStore';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export const AppNavigator = (): React.JSX.Element => {
  const { token, isBootstrapping, signOut } = useAuth();

  useEffect(() => {
    setUnauthorizedHandler(() => { void signOut(); });
    return () => setUnauthorizedHandler(null);
  }, [signOut]);

  if (isBootstrapping) return <Loader label="Preparing your workspace..." />;
  return (
    <NavigationContainer>
      {token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
