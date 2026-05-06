import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { TaskForm } from '../../components/tasks/TaskForm';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { useTasks } from '../../hooks/useTasks';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import type { TasksStackParamList } from '../../types';

const colors = {
  bg: '#F5F0EB',
  card: '#FBF7F2',
  text: '#1C1917',
  muted: '#78716C',
  accent: '#8B5A2B',
};

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskDetail'>;

const fmt = (iso: string): string =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));

export const TaskDetailScreen = ({ route, navigation }: Props): React.JSX.Element => {
  const { data: tasks = [] } = useTasks();
  const task = tasks.find((t) => t._id === route.params.taskId);
  const update = useUpdateTask();
  const remove = useDeleteTask();
  const [editing, setEditing] = useState(false);

  if (!task) {
    return (
      <SafeAreaView style={styles.safe}>
        <EmptyState
          title="Task not found"
          message="It may have been deleted."
          actionLabel="Back to tasks"
          onAction={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  const confirmDelete = () => {
    Alert.alert('Delete task', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => remove.mutate(task._id, { onSuccess: () => navigation.goBack() }),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.top}>
            <Pressable onPress={() => navigation.goBack()} style={styles.back}>
              <Ionicons name="chevron-back" size={22} color={colors.accent} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
            <Pressable onPress={() => setEditing(!editing)} style={styles.edit}>
              <Ionicons
                name={editing ? 'close-outline' : 'create-outline'}
                size={20}
                color={colors.accent}
              />
              <Text style={styles.editText}>{editing ? 'Close' : 'Edit'}</Text>
            </Pressable>
          </View>
          <Text style={styles.title}>Task Details</Text>
          {editing ? (
            <TaskForm
              initialTitle={task.title}
              initialDescription={task.description}
              submitLabel="Save Changes"
              loading={update.isPending}
              onSubmit={(input) => update.mutate({ id: task._id, input }, { onSuccess: () => setEditing(false) })}
            />
          ) : (
            <View style={styles.card}>
              <Text style={[styles.taskTitle, task.isCompleted && styles.done]}>{task.title}</Text>
              {task.description ? <Text style={styles.desc}>{task.description}</Text> : null}
              <Text style={styles.meta}>Created: {fmt(task.createdAt)}</Text>
              <Text style={styles.meta}>Updated: {fmt(task.updatedAt)}</Text>
              <Button
                title={task.isCompleted ? 'Mark Pending' : 'Mark Completed'}
                variant="ghost"
                onPress={() => update.mutate({ id: task._id, input: { isCompleted: !task.isCompleted } })}
              />
            </View>
          )}
          <Button title="Delete Task" variant="danger" onPress={confirmDelete} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  container: { padding: 24, gap: 22 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { minHeight: 44, flexDirection: 'row', alignItems: 'center' },
  backText: { color: colors.accent, fontWeight: '800' },
  edit: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 4 },
  editText: { color: colors.accent, fontWeight: '800' },
  title: { fontSize: 28, fontWeight: '900', color: colors.text, textAlign: 'center' },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 18, gap: 14 },
  taskTitle: { fontSize: 22, fontWeight: '900', color: colors.text },
  done: { textDecorationLine: 'line-through', opacity: 0.6 },
  desc: { color: colors.text, lineHeight: 22 },
  meta: { color: colors.muted },
});
