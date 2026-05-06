import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController';
import { protect } from '../middleware/authMiddleware';
import { createTaskValidator, deleteTaskValidator, getTasksValidator, updateTaskValidator } from '../validators/taskValidators';
import { validateRequest } from '../middleware/errorMiddleware';

const router = Router();
router.use(protect);
router.get('/', getTasksValidator, validateRequest, getTasks);
router.post('/', createTaskValidator, validateRequest, createTask);
router.patch('/:id', updateTaskValidator, validateRequest, updateTask);
router.delete('/:id', deleteTaskValidator, validateRequest, deleteTask);
export default router;
