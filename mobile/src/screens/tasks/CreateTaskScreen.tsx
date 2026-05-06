import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TaskForm } from '../../components/tasks/TaskForm';
import { useCreateTask } from '../../hooks/useCreateTask';

const colors = {
  bg: '#F5F0EB',
  accent: '#8B5A2B',
  text: '#1C1917',
};

export const CreateTaskScreen = (): React.JSX.Element => {
  const navigation = useNavigation();
  const create = useCreateTask();
  const [formKey, setFormKey] = useState(0);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Tasks' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          bounces
          overScrollMode="always"
        >
          <Pressable onPress={goBack} style={styles.back}>
            <Ionicons name="chevron-back" size={22} color={colors.accent} />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.title}>Create Task</Text>
          <TaskForm
            key={formKey}
            submitLabel="Create Task"
            loading={create.isPending}
            onSubmit={(input) =>
              create.mutate(input, {
                onSuccess: () => {
                  setFormKey((key) => key + 1);
                  goBack();
                },
              })
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  container: { padding: 24, gap: 24 },
  back: { minHeight: 44, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  backText: { color: colors.accent, fontWeight: '800' },
  title: { fontSize: 28, fontWeight: '900', color: colors.text, textAlign: 'center' },
});
