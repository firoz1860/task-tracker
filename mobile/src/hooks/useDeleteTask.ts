import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { tasksApi } from '../api/tasksApi';
import type { Task } from '../types';
import { tasksQueryKey } from './useTasks';

interface Ctx {
  previous?: Task[];
}

export const useDeleteTask = (): UseMutationResult<string, Error, string, Ctx> => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasksApi.deleteTask,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: tasksQueryKey });
      const previous = qc.getQueryData<Task[]>(tasksQueryKey);
      if (previous) {
        qc.setQueryData<Task[]>(tasksQueryKey, previous.filter((task) => task._id !== id));
      }
      return { previous };
    },
    onError: (_error, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(tasksQueryKey, ctx.previous);
    },
    onSettled: async () => {
      await qc.invalidateQueries({ queryKey: tasksQueryKey });
    },
  });
};
