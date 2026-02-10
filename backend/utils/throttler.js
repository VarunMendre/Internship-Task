/**
 * Simple request throttler middleware (optional enhancement)
 * For more complex logic, use rateLimiter.js
 */
const throttler = (delay) => {
  let lastRequest = 0;
  return (req, res, next) => {
    const now = Date.now();
    if (now - lastRequest < delay) {
      return res.status(429).json({
        success: false,
        error: 'Throttled: Too frequent requests'
      });
    }
    lastRequest = now;
    next();
  };
};

export default throttler;
