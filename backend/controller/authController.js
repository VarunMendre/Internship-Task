import asyncHandler from "../utils/asyncHandler.js";

// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
    // Placeholder
});
