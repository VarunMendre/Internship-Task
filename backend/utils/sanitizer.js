import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Strips all HTML/Script tags from input
 */
const sanitize = (input) => {
  if (typeof input === 'string') {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  }

  if (Array.isArray(input)) {
    return input.map(item => sanitize(item));
  }

  if (input !== null && typeof input === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitize(value);
    }
    return sanitized;
  }

  return input;
};

export default sanitize;