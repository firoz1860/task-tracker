import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authApi } from '../../api/authApi';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../store/authStore';
import type { AuthStackParamList } from '../../types';

const colors = {
  bg: '#F5F0EB',
  text: '#1C1917',
  muted: '#78716C',
  accent: '#8B5A2B',
  danger: '#DC2626',
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

interface ApiErrorBody {
  message?: string;
  errors?: Array<{ msg?: string }>;
}

const getSignupErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    const validationMessage = error.response?.data.errors?.[0]?.msg;
    if (validationMessage) {
      return validationMessage;
    }

    const serverMessage = error.response?.data.message;
    if (serverMessage) {
      return serverMessage;
    }

    if (error.code === 'ECONNABORTED') {
      return 'The server took too long to respond. Please try again.';
    }

    if (error.request) {
      return 'Cannot reach the server. Check the API URL and backend server.';
    }
  }

  return 'Could not create account. Please try again.';
};

export const SignupScreen = ({ navigation }: Props): React.JSX.Element => {
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (): Promise<void> => {
    Keyboard.dismiss();
    setError('');
    setLoading(true);
    try {
      const data = await authApi.signup({ name: name.trim(), email: email.trim(), password });
      await signIn(data.user, data.token);
    } catch (error) {
      setError(getSignupErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create your account</Text>
        <View style={styles.form}>
          <Input label="Name" value={name} onChangeText={setName} />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            title="Sign Up"
            loading={loading}
            disabled={!name || !email || password.length < 6}
            onPress={submit}
          />
          <Pressable onPress={() => navigation.navigate('Login')} style={styles.linkWrap}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '900', color: colors.text, textAlign: 'center' },
  subtitle: { color: colors.muted, textAlign: 'center', marginTop: 8, marginBottom: 40 },
  form: { gap: 18 },
  error: { color: colors.danger, textAlign: 'center' },
  linkWrap: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  link: { color: colors.accent, fontWeight: '700' },
});
