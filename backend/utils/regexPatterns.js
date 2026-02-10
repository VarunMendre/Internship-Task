export const REGEX = {
    NAME: /^.{20,60}$/,
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    ADDRESS: /^.{1,400}$/,
    PASSWORD: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]).{8,16}$/,
    RATING: /^[1-5]$/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
};

export const validate = (data, schema) => {
    const errors = {};
    for (const [field, pattern] of Object.entries(schema)) {
        const value = String(data[field] || '');
        if (!pattern.test(value)) {
            errors[field] = `Invalid ${field}`;
        }
    }
    return {
        success: Object.keys(errors).length === 0,
        errors
    };
};
