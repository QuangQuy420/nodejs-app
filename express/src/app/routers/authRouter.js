import express from 'express';
import { register, login, refreshToken } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';

const authRouter = express.Router();

authRouter
    .post('/register', validateRegister, register)
    .post('/login', validateLogin, login)
    .post('/refresh-token', refreshToken)

export default authRouter;