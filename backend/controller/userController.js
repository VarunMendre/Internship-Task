import asyncHandler from "../utils/asyncHandler.js";

// @desc    List stores for rating with personalized state
// @route   GET /api/v1/user/stores
// @access  Private (User)
export const getStoresForRating = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    Submit or Update a rating
// @route   POST /api/v1/user/ratings
// @access  Private (User)
export const submitOrUpdateRating = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    Self-service password update
// @route   PATCH /api/v1/user/profile/password
// @access  Private (User)
export const updatePassword = asyncHandler(async (req, res, next) => {
    // Placeholder
});