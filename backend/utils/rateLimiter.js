import { rateLimit } from 'express-rate-limit';

/**
 * Reusable rate limiter middleware
 */
const createLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs: windowMs || 15 * 60 * 1000, // 15 minutes
    max: max || 100,
    message: {
      success: false,
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: message || 'Too many requests from this IP, please try again after 15 minutes'
      }
    }
  });
};

export default createLimiter;