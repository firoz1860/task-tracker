import React, { useMemo } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../store/authStore';

const colors = {
  bg: '#F5F0EB',
  card: '#FBF7F2',
  text: '#1C1917',
  muted: '#78716C',
  line: '#E7DED5',
  accent: '#8B5A2B',
  accentSoft: '#E9D9CA',
  danger: '#DC2626',
};

export const ProfileScreen = (): React.JSX.Element => {
  const { user, signOut } = useAuth();
  const { data: tasks = [] } = useTasks();

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.isCompleted).length;
    const pending = tasks.length - completed;
    const rate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
    return { completed, pending, total: tasks.length, rate };
  }, [tasks]);

  const initials = (user?.name ?? user?.email ?? 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.identity}>
            <Text style={styles.title}>{user?.name ?? 'Your Profile'}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.sectionTitle}>Task Progress</Text>
              <Text style={styles.muted}>{stats.completed} of {stats.total} completed</Text>
            </View>
            <Text style={styles.rate}>{stats.rate}%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${stats.rate}%` }]} />
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.statCard}>
            <Ionicons name="list-outline" size={24} color={colors.accent} />
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={24} color={colors.accent} />
            <Text style={styles.statNumber}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle-outline" size={24} color={colors.accent} />
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <Pressable onPress={() => { void signOut(); }} style={styles.logout}>
          <Ionicons name="log-out-outline" size={22} color={colors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 24, gap: 18 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  avatarText: { color: colors.bg, fontSize: 22, fontWeight: '900' },
  identity: { flex: 1 },
  title: { color: colors.text, fontSize: 28, fontWeight: '900' },
  email: { color: colors.muted, marginTop: 4 },
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 18,
    gap: 16,
  },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '900' },
  muted: { color: colors.muted, marginTop: 4 },
  rate: { color: colors.accent, fontSize: 28, fontWeight: '900' },
  track: { height: 10, borderRadius: 5, overflow: 'hidden', backgroundColor: colors.accentSoft },
  fill: { height: '100%', borderRadius: 5, backgroundColor: colors.accent },
  grid: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    minHeight: 112,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    justifyContent: 'space-between',
  },
  statNumber: { color: colors.text, fontSize: 24, fontWeight: '900' },
  statLabel: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  logout: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: { color: colors.danger, fontSize: 16, fontWeight: '800' },
});
