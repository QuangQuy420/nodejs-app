import AuthRepository from "../repositories/authRepository.js";
const authRepository = new AuthRepository();

/**
 * Register a new user.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 */
export const register = async (req, res) => {
    try {
        const newUser = await authRepository.register(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Login user.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 */
export const login = async (req, res) => {
    try {
        const newUser = await authRepository.login(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Refresh new access token.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 */
export const refreshToken = async (req, res) => {
    try {
        const newAccessToken = await authRepository.refreshToken(req.body);
        res.status(201).json(newAccessToken);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}