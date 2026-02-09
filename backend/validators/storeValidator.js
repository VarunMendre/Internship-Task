const Joi = require('joi');

exports.validateStore = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().max(400).required()
    });
    return schema.validate(data);
};

exports.validateAdminStoreCreation = (data) => {
    const schema = Joi.object({
        owner: Joi.object({
            name: Joi.string().min(20).max(60).required(),
            email: Joi.string().email().required(),
            address: Joi.string().max(400).required(),
            password: Joi.string().min(8).max(16).pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])')).required()
        }).required(),
        store: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            address: Joi.string().max(400).required()
        }).required()
    });
    return schema.validate(data);
};
