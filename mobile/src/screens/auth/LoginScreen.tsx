import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props): React.JSX.Element => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (): Promise<void> => {
    setError('');
    setLoading(true);
    try {
      const data = await authApi.login({ email: email.trim(), password });
      await signIn(data.user, data.token);
    } catch {
      setError('Invalid email or password.');
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
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Welcome back! Please login to your account.</Text>
        </View>
        <View style={styles.form}>
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
            title="Login"
            loading={loading}
            disabled={!email || !password}
            onPress={submit}
          />
          <Pressable onPress={() => navigation.navigate('Signup')} style={styles.linkWrap}>
            <Text style={styles.link}>Don&apos;t have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 48 },
  title: { fontSize: 32, fontWeight: '900', color: colors.text },
  subtitle: { color: colors.muted, textAlign: 'center', marginTop: 8 },
  form: { gap: 18 },
  error: { color: colors.danger, textAlign: 'center' },
  linkWrap: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  link: { color: colors.accent, fontWeight: '700' },
});
