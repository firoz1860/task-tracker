import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';

const colors = { text: '#1C1917', muted: '#78716C', accent: '#8B5A2B' };

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ title, message, actionLabel, onAction }: EmptyStateProps): React.JSX.Element => (
  <View style={styles.box}>
    <Ionicons name="checkbox-outline" size={56} color={colors.accent} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
    {actionLabel && onAction ? (
      <Button title={actionLabel} onPress={onAction} style={styles.button} />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  message: { color: colors.muted, textAlign: 'center', lineHeight: 22 },
  button: { marginTop: 8, alignSelf: 'stretch' },
});
