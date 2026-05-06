import { body, param, query } from 'express-validator';

export const getTasksValidator = [
  query('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('status must be pending or completed')
];

export const createTaskValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 120 }).withMessage('Title must be 120 characters or less'),
  body('description').optional({ nullable: true }).trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or less')
];

export const updateTaskValidator = [
  param('id').isMongoId().withMessage('Invalid task id'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 120 }).withMessage('Title must be 120 characters or less'),
  body('description').optional({ nullable: true }).trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or less'),
  body('isCompleted').optional().isBoolean().withMessage('isCompleted must be a boolean')
];

export const deleteTaskValidator = [param('id').isMongoId().withMessage('Invalid task id')];
