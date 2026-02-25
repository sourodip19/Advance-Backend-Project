import express from 'express';
import { userLogin, userRegister } from '../controllers/auth.controller.js';
const authRouter = express.Router();

// register
authRouter.post('/register', userRegister);
//login
authRouter.post('/login', userLogin);

export default authRouter;
