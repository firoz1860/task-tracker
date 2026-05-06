import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { Loader } from '../../components/common/Loader';
import { FilterBar } from '../../components/tasks/FilterBar';
import { TaskCard } from '../../components/tasks/TaskCard';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { useTasks } from '../../hooks/useTasks';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { useAuth } from '../../store/authStore';
import type { Task, TaskFilter, TasksStackParamList } from '../../types';

const colors = {
  bg: '#F5F0EB',
  text: '#1C1917',
  muted: '#78716C',
  accent: '#8B5A2B',
};

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskList'>;

export const TaskListScreen = ({ navigation }: Props): React.JSX.Element => {
  const { width } = useWindowDimensions();
  const { signOut } = useAuth();
  const [filter, setFilter] = useState<TaskFilter>('all');
  const { data: tasks = [], isLoading, isError, refetch, isRefetching } = useTasks();
  const update = useUpdateTask();
  const remove = useDeleteTask();

  const counts = useMemo(() => {
    const completed = tasks.filter((task) => task.isCompleted).length;
    return {
      all: tasks.length,
      pending: tasks.length - completed,
      completed,
    };
  }, [tasks]);

  const filtered = useMemo(
    () => tasks.filter((t) => filter === 'all' || (filter === 'pending' ? !t.isCompleted : t.isCompleted)),
    [tasks, filter],
  );

  const columns = width > 768 ? 2 : 1;

  const onDelete = (id: string): void => {
    Alert.alert('Delete task', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => remove.mutate(id) },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Loader label="Loading tasks..." />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.safe}>
        <ErrorState message="Couldn't load your tasks." onRetry={() => { void refetch(); }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.subtitle}>{tasks.length} tasks in your list</Text>
        </View>
        <Pressable onPress={() => { void signOut(); }} style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <FilterBar value={filter} onChange={setFilter} counts={counts} />
        {filtered.length === 0 ? (
          <EmptyState
            title={filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
            message="You're all caught up. Add a task when you're ready."
            actionLabel="Add New Task"
            onAction={() => navigation.navigate('CreateTask')}
          />
        ) : (
          <FlatList
            key={columns}
            data={filtered}
            keyExtractor={(item) => item._id}
            numColumns={columns}
            columnWrapperStyle={columns > 1 ? styles.row : undefined}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={() => { void refetch(); }} />
            }
            renderItem={({ item }) => (
              <View style={columns > 1 ? styles.gridItem : undefined}>
                <TaskCard
                  task={item}
                  onPress={(task: Task) => navigation.navigate('TaskDetail', { taskId: task._id })}
                  onDelete={onDelete}
                  onToggle={(task: Task) =>
                    update.mutate({ id: task._id, input: { isCompleted: !task.isCompleted } })
                  }
                />
              </View>
            )}
          />
        )}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Create task"
        onPress={() => navigation.navigate('CreateTask')}
        style={styles.fab}
      >
        <Ionicons name="add" size={28} color={colors.bg} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 30, fontWeight: '900', color: colors.text },
  subtitle: { color: colors.muted, marginTop: 2 },
  logout: { minHeight: 44, justifyContent: 'center' },
  logoutText: { color: colors.accent, fontWeight: '800' },
  content: { flex: 1, paddingHorizontal: 16, gap: 16 },
  list: { gap: 14, paddingVertical: 16, paddingBottom: 110 },
  row: { gap: 14 },
  gridItem: { flex: 1 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    elevation: 3,
    shadowColor: '#1C1917',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
});
