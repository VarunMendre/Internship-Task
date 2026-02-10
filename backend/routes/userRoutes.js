import express from 'express';
const router = express.Router();
import * as userController from '../controller/userController.js';
import authorize from '../middleware/roleMiddleware.js';
import { ROLES } from '../utils/constants.js';

// Restricted to Normal Users
router.get('/stores', authorize(ROLES.USER), userController.getStoresForRating);
router.post('/ratings', authorize(ROLES.USER), userController.submitOrUpdateRating);
router.patch('/profile/password', authorize(ROLES.USER), userController.updatePassword);

export default router;
