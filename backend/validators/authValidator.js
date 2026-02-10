import { z } from 'zod';
import { REGEX } from '../utils/regexPatterns.js';

// Signup Schema
export const signupSchema = z.object({
  name: z.string().regex(REGEX.NAME, 'Name must be 20-60 characters'),
  email: z.string().regex(REGEX.EMAIL, 'Invalid email format'),
  address: z.string().regex(REGEX.ADDRESS, 'Address must not exceed 400 characters'),
  password: z.string().regex(REGEX.PASSWORD, 'Password must be 8-16 chars with 1 Uppercase & 1 Special char')
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().regex(REGEX.EMAIL, 'Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['ADMIN', 'USER', 'STORE_OWNER'])
});
