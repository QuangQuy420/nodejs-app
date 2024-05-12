import express from 'express';
import { getUsers, getUserById, createUser, softDeleteUser, updateUser } from '../controllers/userController.js';
import { validateCreateUser } from '../validators/userValidator.js'

const router = express.Router();

router
    .get('/', getUsers)
    .get('/:userId', getUserById)
    .post('/create', validateCreateUser, createUser)
    .delete('/:userId', softDeleteUser)
    .put('/:userId', updateUser);

export default router;
