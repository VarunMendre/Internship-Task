import express from 'express';
const router = express.Router();
import * as ownerController from '../controller/ownerController.js';
import authorize from '../middleware/roleMiddleware.js';
import { ROLES } from '../utils/constants.js';

// Restricted to Store Owners
router.use(authorize(ROLES.STORE_OWNER));

router.get('/dashboard', ownerController.getOwnerDashboard);
router.patch('/profile/password', ownerController.updatePassword);

export default router;
