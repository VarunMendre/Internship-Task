import validate from "../utils/validator.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import successResponse from "../utils/SuccessResponse.js";
import { loginSchema, signupSchema } from "../validators/authValidator.js";
import { loginService, signupService } from "../services/users/authService.js";

// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res, next) => {
    // validate the input 
    const { success, errors, data } = validate(signupSchema, req.body);

    if (!success) {
        return next(new ErrorResponse('Validation Failed', 400, 'VALIDATION_ERROR', errors));
    }

    // calling service
    const result = await signupService(data);

    successResponse(res, result, 201, 'User registered successfully');
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
    const { success, errors, data } = validate(loginSchema, req.body);

    if (!success) {
        return next(new ErrorResponse('Validation Failed', 400, 'VALIDATION_ERROR', errors));
    }

    const result = await loginService(data);

    successResponse(res, result, 200, 'User logged in successfully');
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
    // Placeholder
});
