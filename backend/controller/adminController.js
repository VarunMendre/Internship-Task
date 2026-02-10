import asyncHandler from "../utils/asyncHandler.js";

// @desc    Atomic creation of a Store and its corresponding Owner account
// @route   POST /api/v1/admin/stores
// @access  Private (Admin)
export const createStoreWithOwner = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    Admin creates another Admin or a Normal User manually
// @route   POST /api/v1/admin/users
// @access  Private (Admin)
export const createUser = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    Aggregate statistics for the Admin dashboard
// @route   GET /api/v1/admin/dashboard/stats
// @access  Private (Admin)
export const getDashboardStats = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    List all stores with pagination, sorting, and filtering
// @route   GET /api/v1/admin/stores
// @access  Private (Admin)
export const getStores = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    List all Normal/Admin users with filtering
// @route   GET /api/v1/admin/users
// @access  Private (Admin)
export const getUsers = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    Detailed view of a user profile
// @route   GET /api/v1/admin/users/:id
// @access  Private (Admin)
export const getUserById = asyncHandler(async (req, res, next) => {
    // Placeholder
});
