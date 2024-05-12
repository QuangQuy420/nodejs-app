import express from 'express';
import { getUsers, getUserById, createUser } from '../controllers/userController.js';
import { validateCreateUser } from '../validators/userValidator.js'

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', validateCreateUser, createUser);

export default router;
