import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { tasksApi, type TaskUpdateInput } from '../api/tasksApi';
import type { Task } from '../types';
import { tasksQueryKey } from './useTasks';

interface UpdateVars {
  id: string;
  input: TaskUpdateInput;
}

interface Ctx {
  previous?: Task[];
}

export const useUpdateTask = (): UseMutationResult<Task, Error, UpdateVars, Ctx> => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => tasksApi.updateTask(id, input),
    onMutate: async ({ id, input }) => {
      await qc.cancelQueries({ queryKey: tasksQueryKey });
      const previous = qc.getQueryData<Task[]>(tasksQueryKey);
      if (previous) {
        qc.setQueryData<Task[]>(
          tasksQueryKey,
          previous.map((task) =>
            task._id === id
              ? { ...task, ...input, updatedAt: new Date().toISOString() }
              : task,
          ),
        );
      }
      return { previous };
    },
    onError: (_error, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(tasksQueryKey, ctx.previous);
    },
    onSettled: async () => {
      await qc.invalidateQueries({ queryKey: tasksQueryKey });
    },
  });
};
