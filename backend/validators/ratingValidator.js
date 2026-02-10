import { z } from 'zod';
import { REGEX } from '../utils/regexPatterns.js';

export const ratingSchema = z.object({
    storeId: z.string().regex(REGEX.UUID, 'Invalid store ID format'),
    rating: z.number().int().min(1).max(5),
    comment: z.string().max(1000).optional().nullable()
});
