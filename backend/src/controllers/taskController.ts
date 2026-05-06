import type { Response, NextFunction } from 'express';
import { Task } from '../models/Task';
import type { AuthenticatedRequest } from '../types';

const getUserId = (req: AuthenticatedRequest): string => {
  if (!req.user) {
    throw new Error('Authenticated user is unavailable');
  }
  return req.user.id;
};

export const getTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const status = req.query.status as 'pending' | 'completed' | undefined;
    const filter = {
      userId: getUserId(req),
      ...(status ? { isCompleted: status === 'completed' } : {})
    };
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: { tasks } });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description } = req.body as { title: string; description?: string };
    const task = await Task.create({ userId: getUserId(req), title, description });
    res.status(201).json({ success: true, data: { task } });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = getUserId(req);
    const update = req.body as { title?: string; description?: string; isCompleted?: boolean };
    const task = await Task.findOneAndUpdate({ _id: req.params.id, userId }, update, { new: true, runValidators: true });
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }
    res.status(200).json({ success: true, data: { task } });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: getUserId(req) });
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }
    res.status(200).json({ success: true, data: { id: req.params.id } });
  } catch (error) {
    next(error);
  }
};
