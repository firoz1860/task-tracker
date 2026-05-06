export interface User { id: string; name: string; email: string; }
export interface Task { _id: string; title: string; description?: string; isCompleted: boolean; createdAt: string; updatedAt: string; }
export interface ApiResponse<T> { success: boolean; data: T; message?: string; }
export type TaskFilter = 'all' | 'pending' | 'completed';

export interface AuthPayload { user: User; token: string; }
export interface TasksPayload { tasks: Task[]; }
export interface TaskPayload { task: Task; }

export type RootStackParamList = { Auth: undefined; Main: undefined; };
export type AuthStackParamList = { Login: undefined; Signup: undefined; };
export type MainTabParamList = { Tasks: undefined; Add: undefined; Profile: undefined; };
export type TasksStackParamList = { TaskList: undefined; CreateTask: undefined; TaskDetail: { taskId: string }; };
