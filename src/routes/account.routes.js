import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createAccount } from '../controllers/account.controller.js';
const accountRouter = express.Router();

/**
 * - POST api/accounts
 * - Create a new account
 * - Protect Route
 */
accountRouter.post('/create',authMiddleware,createAccount);
export default accountRouter;