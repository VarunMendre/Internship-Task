const Joi = require('joi');

exports.validateSignup = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(20).max(60).required().messages({
      'string.min': 'Name must be at least 20 characters long',
      'string.max': 'Name cannot exceed 60 characters'
    }),
    email: Joi.string().email().required(),
    address: Joi.string().max(400).required(),
    password: Joi.string()
      .min(8)
      .max(16)
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])'))
      .required()
      .messages({
        'string.pattern.base': 'Password must include at least one uppercase letter and one special character'
      })
  });
  return schema.validate(data);
};

exports.validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('ADMIN', 'USER', 'STORE_OWNER').required()
  });
  return schema.validate(data);
};
