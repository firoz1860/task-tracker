import type { ErrorRequestHandler } from 'express';
import { validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';
import type { ApiError } from '../types';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    return;
  }
  next();
};

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler: ErrorRequestHandler = (err: ApiError, _req, res, _next): void => {
  const statusCode = err.statusCode ?? 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server error',
    ...(err.errors ? { errors: err.errors } : {})
  });
};
