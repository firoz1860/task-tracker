import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { tasksApi, type TaskInput } from '../api/tasksApi';
import type { Task } from '../types';
import { tasksQueryKey } from './useTasks';

export const useCreateTask = (): UseMutationResult<Task, Error, TaskInput> => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: tasksQueryKey });
    },
  });
};
