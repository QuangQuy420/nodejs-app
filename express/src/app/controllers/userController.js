import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

/**
 * Get all users.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 */
export const getUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllRecord();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get user by id.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 */
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userRepository.getByField('id', userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Create new user.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 */
export const createUser = async (req, res) => {
    try {
        const newUser = await userRepository.createUser(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Soft delete a user.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 */
export const softDeleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userRepository.softDeleteById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Update a user by userId.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 */
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const dataUser = req.body;
        const userUpdate = await userRepository.updateUserById(userId, dataUser);
        res.status(200).json(userUpdate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
