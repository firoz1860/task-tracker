import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';

const colors = { text: '#1C1917', muted: '#78716C', accent: '#8B5A2B', accentSoft: '#E9D9CA' };

export const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}): React.JSX.Element => (
  <View style={styles.box}>
    <Text style={styles.icon}>!</Text>
    <Text style={styles.title}>Something went wrong</Text>
    <Text style={styles.message}>{message}</Text>
    <Button title="Retry" onPress={onRetry} style={styles.button} />
  </View>
);

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  icon: {
    overflow: 'hidden',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accentSoft,
    textAlign: 'center',
    lineHeight: 56,
    color: colors.accent,
    fontSize: 32,
    fontWeight: '900',
  },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  message: { color: colors.muted, textAlign: 'center' },
  button: { alignSelf: 'stretch', marginTop: 8 },
});
