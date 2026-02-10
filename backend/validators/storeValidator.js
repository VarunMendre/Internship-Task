import { z } from 'zod';
import { REGEX } from '../utils/regexPatterns.js';

export const storeSchema = z.object({
    name: z.string().min(1, 'Store name is required').max(255),
    email: z.string().regex(REGEX.EMAIL, 'Invalid store email'),
    address: z.string().regex(REGEX.ADDRESS, 'Address must not exceed 400 characters')
});

export const adminStoreSchema = z.object({
    owner: z.object({
        name: z.string().regex(REGEX.NAME, 'Owner name must be 20-60 characters'),
        email: z.string().regex(REGEX.EMAIL, 'Invalid owner email'),
        address: z.string().regex(REGEX.ADDRESS, 'Owner address must not exceed 400 characters'),
        password: z.string().regex(REGEX.PASSWORD, 'Owner password must be 8-16 chars with 1 Uppercase & 1 Special char')
    }),
    store: storeSchema
});
