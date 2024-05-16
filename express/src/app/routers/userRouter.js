import express from 'express';
import { getUsers, getUserById, createUser, softDeleteUser, updateUser } from '../controllers/userController.js';
import { validateCreateUser } from '../validators/userValidator.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

// Apply authMiddleware to all routes in userRouter.
userRouter.use(authMiddleware);

userRouter
    .get('/', getUsers)
    .get('/:userId', getUserById)
    .post('/create', validateCreateUser, createUser)
    .delete('/:userId', softDeleteUser)
    .put('/:userId', updateUser);

export default userRouter;
