import { User } from '../models/User.js';
import BaseRepository from "./BaseRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    /**
     * Handle register a new user.
     * 
     * @param {*} data - Data user uses to register.
     * @returns - New user.
     */
    async register(data) {
        const { email, password, passwordConfirm } = data;
        const existingUser = await this.getByField('email', email);

        if (existingUser) {
            throw new Error('Email already exists');
        }
        if (password !== passwordConfirm) {
            throw new Error('Password confirm does not match');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            data: {
                email: email,
                password: hashedPassword,
            }
        });
        return newUser;

    }

    /**
     * Generate access token to handle middleware.
     * 
     * @param {*} data - Data include id and email of user.
     * @returns - Access token.
     */
    generateAccessToken(data) {
        return jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: '3m' });
    };

    /**
     * Generate refresh token to handle refresh access token if any.
     * 
     * @param {*} data - Data include id and email of user.
     * @returns - Refresh token.
     */
    generateRefreshToken(data) {
        return jwt.sign(data, process.env.REFRESH_TOKEN, { expiresIn: '30d' });
    };

    /**
     * Handle login to website.
     * 
     * @param {*} data - Data login.
     * @returns - { Access Token, Refresh Token }.
     */
    async login(data) {
        const { email, password } = data;
        const user = await this.getByField('email', email);

        if (!user) {
            throw new Error('Email is not exist!')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Password is not correct!')
        }

        const accessToken = this.generateAccessToken({ id: user.id, email: user.email });
        const refreshToken = this.generateRefreshToken({ id: user.id, email: user.email });

        return {
            accessToken,
            refreshToken,
        };
    }

    /**
     * Regenerate access token from refresh token.
     * 
     * @param {*} data - Refresh token.
     * @returns - { Access token }.
     */
    async refreshToken(data) {
        const { refreshToken } = data;
        const isUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        if (isUser) {
            const accessToken = this.generateAccessToken({ id: isUser.id, email: isUser.email });
            return { 
                accessToken,
            }
        }
    }
}

export default AuthRepository;