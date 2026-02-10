/**
 * Validates data against a Zod schema
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {object} data - Data to validate
 * @returns {object} - { success, data, errors }
 */
const validate = (schema, data) => {
    const result = schema.safeParse(data);

    if (!result.success) {
        // Flatten errors into a simple key-value object
        const errors = result.error.flatten().fieldErrors;
        return {
            success: false,
            errors
        };
    }

    return {
        success: true,
        data: result.data
    };
};

export default validate;