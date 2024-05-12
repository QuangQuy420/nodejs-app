import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

export const getUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userRepository.getUserById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await userRepository.createUser({ name, email, password });

        // Return the newly created user in the response
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};