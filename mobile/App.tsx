import 'react-native-gesture-handler';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { Loader } from './src/components/common/Loader';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/store/authStore';
import { queryClient } from './src/utils/queryClient';

export default function App(): React.JSX.Element {
  const [fontsLoaded] = useFonts({ DMSans_400Regular, DMSans_700Bold });
  if (!fontsLoaded) return <Loader label="Loading fonts..." />;
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}
