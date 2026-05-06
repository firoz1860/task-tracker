import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Task } from '../../types';

const colors = {
  bg: '#F5F0EB',
  card: '#FBF7F2',
  text: '#1C1917',
  muted: '#78716C',
  accent: '#8B5A2B',
};

interface TaskCardProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onPress: (task: Task) => void;
}

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(iso),
  );

export const TaskCard = ({ task, onToggle, onDelete, onPress }: TaskCardProps): React.JSX.Element => (
  <Pressable onPress={() => onPress(task)} style={[styles.card, task.isCompleted && styles.doneCard]}>
    <Pressable
      onPress={() => onToggle(task)}
      hitSlop={12}
      style={[styles.check, task.isCompleted && styles.checked]}
    >
      {task.isCompleted ? <Ionicons name="checkmark" size={18} color={colors.bg} /> : null}
    </Pressable>
    <View style={styles.content}>
      <Text numberOfLines={1} style={[styles.title, task.isCompleted && styles.doneTitle]}>
        {task.title}
      </Text>
      {task.description ? (
        <Text numberOfLines={2} style={styles.description}>{task.description}</Text>
      ) : null}
      <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
    </View>
    <Pressable
      accessibilityRole="button"
      onPress={() => onDelete(task._id)}
      hitSlop={12}
      style={styles.delete}
    >
      <Ionicons name="trash-outline" size={22} color={colors.muted} />
    </Pressable>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    minHeight: 92,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#1C1917',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  doneCard: { opacity: 0.66 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: colors.accent, borderColor: colors.accent },
  content: { flex: 1, gap: 4 },
  title: { color: colors.text, fontSize: 16, fontWeight: '800' },
  doneTitle: { textDecorationLine: 'line-through' },
  description: { color: colors.muted, lineHeight: 20 },
  date: { color: colors.muted, fontSize: 12, marginTop: 2 },
  delete: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
});
