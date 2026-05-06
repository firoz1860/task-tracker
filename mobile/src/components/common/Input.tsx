import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

const colors = {
  card: '#FBF7F2',
  text: '#1C1917',
  muted: '#78716C',
  line: '#E7DED5',
  danger: '#DC2626',
};

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input = ({ label, error, style, ...props }: InputProps): React.JSX.Element => (
  <View style={styles.wrap}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholderTextColor={colors.muted}
      style={[styles.input, props.multiline && styles.multi, style]}
      {...props}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { color: colors.text, fontSize: 14, fontWeight: '700' },
  input: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    color: colors.text,
    fontSize: 16,
  },
  multi: { minHeight: 120, paddingTop: 14, textAlignVertical: 'top' },
  error: { color: colors.danger, fontSize: 13 },
});
