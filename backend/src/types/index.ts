import type { Request } from 'express';

export interface JwtUserPayload {
  id: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtUserPayload;
}

export interface ApiError extends Error {
  statusCode?: number;
  errors?: unknown[];
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}
