import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { User } from '../models/User';
import type { UserResponse } from '../types';

const buildUserResponse = (user: { _id: unknown; name: string; email: string }): UserResponse => ({
  id: String(user._id),
  name: user.name,
  email: user.email
});

const generateToken = (user: UserResponse): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is missing from environment variables');
  }
  const expiresIn = (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'];
  return jwt.sign({ id: user.id, email: user.email }, secret as Secret, { expiresIn });
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ success: false, message: 'Email is already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await User.create({ name, email, password: hashedPassword });
    const user = buildUserResponse(createdUser);
    const token = generateToken(user);

    res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const userWithPassword = await User.findOne({ email }).select('+password');
    if (!userWithPassword) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, userWithPassword.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const user = buildUserResponse(userWithPassword);
    const token = generateToken(user);
    res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};
