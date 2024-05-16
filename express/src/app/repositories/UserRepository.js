import { User } from '../models/User.js';
import BaseRepository from './BaseRepository.js';

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    /**
     * Handle create user.
     * 
     * @param {*} data - Data to create a new user.
     * @returns - New user.
     */
    async createUser(data) {
        const { name, email, password, passwordConfirm } = data;

        // Check if the email already exists in the database.
        const existingUser = await this.getByField('email', email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Check if the password matches the password confirmation.
        if (password !== passwordConfirm) {
            throw new Error('Password confirm does not match');
        }
        const newUser = await User.create({
            data: {
                name: name,
                email: email,
                password: password,
            }
        });
        return newUser;
    }

    /**
     * Update user by Id.
     * 
     * @param {*} userId - Id of user need to update.
     * @param {*} data - Data of user need to update.
     * @returns - Updated user.
     */
    async updateUserById(userId, data) {
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
    }


    // Add other CRUD operations as needed.
}

export default UserRepository;