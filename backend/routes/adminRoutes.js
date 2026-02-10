import express from 'express';
const router = express.Router();
import * as adminController from '../controller/adminController.js';
import authorize from '../middleware/roleMiddleware.js';
import { ROLES } from '../utils/constants.js';

// All routes here should be protected by Auth and Admin Role (handled in server.js or individually)
router.use(authorize(ROLES.ADMIN));

router.post('/stores', adminController.createStoreWithOwner);
router.post('/users', adminController.createUser);
router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/stores', adminController.getStores);
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserById);

export default router;
