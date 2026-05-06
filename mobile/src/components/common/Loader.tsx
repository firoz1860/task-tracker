import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const colors = { accent: '#8B5A2B', muted: '#78716C' };

export const Loader = ({ label = 'Loading...' }: { label?: string }): React.JSX.Element => (
  <View style={styles.box}>
    <ActivityIndicator color={colors.accent} />
    <Text style={styles.text}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  text: { color: colors.muted },
});
