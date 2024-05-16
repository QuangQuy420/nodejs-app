import { z } from 'zod';

// REGISTER SCHEMA
const registerSchema = z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(6, 'Password is required'),
    passwordConfirm: z.string().min(6, 'Password confirm is required'),
})

// LOGIN SCHEMA
const loginSchema = z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(6, 'Password is required'),
})

/**
 * Middleware function to validate the request body when registering a new user.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 * @param {*} next - Express Next function.
 */
export const validateRegister = (req, res, next) => {
    try {
        // Check data input
        registerSchema.parse(req.body);
        // If pass, continue.
        next();
    } catch (error) {
        // Handle error.
        res.status(400).json({ error: error.errors });
    }    
}

/**
 * Middleware function to validate the request body when logining a new user.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 * @param {*} next - Express Next function.
 */
export const validateLogin = (req, res, next) => {
    try {
        // Check data input
        loginSchema.parse(req.body);
        // If pass, continue.
        next();
    } catch (error) {
        // Handle error.
        res.status(400).json({ error: error.errors });
    }    
}
