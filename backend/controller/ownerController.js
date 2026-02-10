import asyncHandler from "../utils/asyncHandler.js";

// @desc    Owner insights for their specific store
// @route   GET /api/v1/owner/dashboard
// @access  Private (Store Owner)
export const getOwnerDashboard = asyncHandler(async (req, res, next) => {
    // Placeholder
});

// @desc    Owner profile password update (Same as User)
// @route   PATCH /api/v1/owner/profile/password
// @access  Private (Store Owner)
export const updatePassword = asyncHandler(async (req, res, next) => {
    // Placeholder
});
