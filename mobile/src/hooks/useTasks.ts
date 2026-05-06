import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { tasksApi } from '../api/tasksApi';
import type { Task } from '../types';
export const tasksQueryKey = ['tasks'] as const;
export const useTasks = (): UseQueryResult<Task[], Error> => useQuery({ queryKey: tasksQueryKey, queryFn: tasksApi.getTasks });
