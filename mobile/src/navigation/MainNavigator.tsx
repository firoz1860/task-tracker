import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { MainTabParamList, TasksStackParamList } from '../types';
import { TaskListScreen } from '../screens/tasks/TaskListScreen';
import { CreateTaskScreen } from '../screens/tasks/CreateTaskScreen';
import { TaskDetailScreen } from '../screens/tasks/TaskDetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export const colors = {
  bg: '#F5F0EB',
  card: '#FBF7F2',
  text: '#1C1917',
  muted: '#78716C',
  line: '#E7DED5',
  accent: '#8B5A2B',
  accentSoft: '#E9D9CA',
  danger: '#DC2626',
};

const Tabs = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<TasksStackParamList>();

const TasksStack = (): React.JSX.Element => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TaskList" component={TaskListScreen} />
    <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
    <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
  </Stack.Navigator>
);

export const MainNavigator = (): React.JSX.Element => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      headerStyle: { backgroundColor: colors.bg },
      tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.line },
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.muted,
      tabBarLabelStyle: { fontWeight: '700', paddingBottom: 2 },
      tabBarIcon: ({ color, size, focused }) => {
        const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
          Tasks: focused ? 'list' : 'list-outline',
          Add: focused ? 'add-circle' : 'add-circle-outline',
          Profile: focused ? 'person-circle' : 'person-circle-outline',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tabs.Screen name="Tasks" component={TasksStack} options={{ headerShown: false }} />
    <Tabs.Screen name="Add" component={CreateTaskScreen} options={{ headerShown: false }} />
    <Tabs.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Tabs.Navigator>
);
