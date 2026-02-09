const Joi = require('joi');

exports.validateRating = (data) => {
  const schema = Joi.object({
    storeId: Joi.string().guid({ version: 'uuidv4' }).required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().allow('', null).optional()
  });
  return schema.validate(data);
};
