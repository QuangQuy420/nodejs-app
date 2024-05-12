class BaseRepository {
    constructor(Model) {
        this.Model = Model;
    }

    /**
     * Get all records from database.
     * 
     * @returns list of users
     */
    async getAllRecord() {
        try {
            return this.Model.findMany();
        } catch (error) {
            throw new Error('Failed to fetch');
        }
    }

    /**
     * Handle get a unique record.
     * 
     * @param {*} field - The field that will query
     * @param {*} value - Value of above field
     * @returns 
     */
    async getByField(field, value) {
        try {
            const query = {};
            query[field] = value;
            const result = await this.Model.findUnique({ where: query });
            return result;
        } catch (error) {
            throw new Error('Failed to fetch');
        }
    }

    /**
     * Handle update user to soft delete.
     * 
     * @param {*} id - Id need to soft delete
     * @returns 
     */
    async softDeleteById(id) {
        try {
            const softDeleteUser = await this.Model.update({
                where: {
                    id,
                },
                data: {
                    deleted: true,
                }
            });
            
            return softDeleteUser;
        } catch (error) {
            throw new Error('Failed to delete');
        }
    }
}

export default BaseRepository;