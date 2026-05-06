import { apiClient } from './client';
import type { ApiResponse, Task, TaskPayload, TasksPayload } from '../types';

export interface TaskInput { title: string; description?: string; }
export interface TaskUpdateInput { title?: string; description?: string; isCompleted?: boolean; }

export const tasksApi = {
  async getTasks(): Promise<Task[]> {
    const { data } = await apiClient.get<ApiResponse<TasksPayload>>('/tasks');
    return data.data.tasks;
  },
  async createTask(input: TaskInput): Promise<Task> {
    const { data } = await apiClient.post<ApiResponse<TaskPayload>>('/tasks', input);
    return data.data.task;
  },
  async updateTask(id: string, input: TaskUpdateInput): Promise<Task> {
    const { data } = await apiClient.patch<ApiResponse<TaskPayload>>(`/tasks/${id}`, input);
    return data.data.task;
  },
  async deleteTask(id: string): Promise<string> {
    await apiClient.delete<ApiResponse<{ id: string }>>(`/tasks/${id}`);
    return id;
  }
};
