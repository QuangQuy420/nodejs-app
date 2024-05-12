import { User } from '../models/User.js';

class UserRepository {
    async getAllUsers() {
        return User.findMany();
    }

    async getUserById(userId) {
        return User.findUnique({ where: { id: userId } });
    }

    async createUser(data) {
        return User.create({ data });
    }


    // Add other CRUD operations as needed
}

export default UserRepository;