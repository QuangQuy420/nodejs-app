import { User } from '../models/User.js';
import BaseRepository from './BaseRepository.js';

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    /**
     * Handle create user.
     * 
     * @param {*} data 
     * @param {*} res - Express Response object.
     * @returns 
     */
    async createUser(data, res) {
        try {
            const { name, email, password, passwordConfirm } = data;

            // Check if the email already exists in the database
            const existingUser = await this.getByField('email', email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Check if the password matches the password confirmation
            if (password !== passwordConfirm) {
                return res.status(400).json({ error: 'Password confirm does not match' });
            }
            const newUser = await User.create({ 
                data: { 
                    name: name, 
                    email: email, 
                    password: password,
                } 
            });
            return res.status(201).json({ newUser })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Update user by Id.
     * 
     * @param {*} userId - Id of user need to update
     * @param {*} data - Data of user need to update
     * @returns 
     */
    async updateUserById(userId, data) {
        try {
            const { name } = data;
            const UpdateUser = await this.Model.update({
                where: {
                    id: userId,
                },
                data: {
                    name: name,
                }
            });
            
            return UpdateUser;
        } catch (error) {
            throw new Error('Failed to update');
        }
    }


    // Add other CRUD operations as needed
}

export default UserRepository;