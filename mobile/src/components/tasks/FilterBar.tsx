import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { TaskFilter } from '../../types';

const colors = { bg: '#F5F0EB', text: '#1C1917', accent: '#8B5A2B', accentSoft: '#E9D9CA' };

interface FilterBarProps {
  value: TaskFilter;
  onChange: (filter: TaskFilter) => void;
  counts?: Record<TaskFilter, number>;
}

const filters: TaskFilter[] = ['all', 'pending', 'completed'];
const labels: Record<TaskFilter, string> = {
  all: 'All',
  pending: 'Pending',
  completed: 'Completed',
};

export const FilterBar = ({ value, onChange, counts }: FilterBarProps): React.JSX.Element => (
  <View style={styles.bar}>
    {filters.map((filter) => (
      <Pressable
        key={filter}
        onPress={() => onChange(filter)}
        style={[styles.tab, value === filter && styles.active]}
      >
        <Text style={[styles.text, value === filter && styles.activeText]}>
          {labels[filter]}
        </Text>
        {counts ? (
          <View style={[styles.badge, value === filter && styles.activeBadge]}>
            <Text style={[styles.badgeText, value === filter && styles.activeBadgeText]}>
              {counts[filter]}
            </Text>
          </View>
        ) : null}
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.accentSoft,
    borderRadius: 999,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
  },
  active: { backgroundColor: colors.accent },
  text: { color: colors.text, fontWeight: '700' },
  activeText: { color: colors.bg },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    paddingHorizontal: 6,
  },
  activeBadge: { backgroundColor: colors.bg },
  badgeText: { color: colors.text, fontSize: 12, fontWeight: '900' },
  activeBadgeText: { color: colors.accent },
});
