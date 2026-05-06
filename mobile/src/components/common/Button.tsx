import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

const colors = {
  bg: '#F5F0EB',
  card: '#FBF7F2',
  line: '#E7DED5',
  accent: '#8B5A2B',
};

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps): React.JSX.Element => (
  <Pressable
    onPress={onPress}
    disabled={disabled || loading}
    style={({ pressed }) => [
      styles.base,
      styles[variant],
      (pressed || disabled) && styles.dim,
      style,
    ]}
  >
    {loading ? (
      <ActivityIndicator color={variant === 'primary' ? colors.bg : colors.accent} />
    ) : (
      <Text style={[styles.text, variant === 'primary' ? styles.primaryText : styles.altText]}>
        {title}
      </Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: { backgroundColor: colors.accent },
  ghost: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line },
  danger: { backgroundColor: '#FEE2E2' },
  dim: { opacity: 0.7 },
  text: { fontSize: 16, fontWeight: '700' },
  primaryText: { color: colors.bg },
  altText: { color: colors.accent },
});
