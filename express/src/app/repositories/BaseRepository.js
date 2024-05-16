class BaseRepository {
    constructor(Model) {
        this.Model = Model;
    }

    /**
     * Get all records from database.
     * 
     * @returns list of users.
     */
    async getAllRecord() {
        return this.Model.findMany();
    }

    /**
     * Handle get a unique record.
     * 
     * @param {*} field - The field that will query.
     * @param {*} value - Value of above field.
     * @returns - Record.
     */
    async getByField(field, value) {
        const query = {};
        query[field] = value;
        const result = await this.Model.findUnique({ where: query });
        return result;
    }

    /**
     * Handle update user to soft delete.
     * 
     * @param {*} id - Id need to soft delete.
     * @returns - Deleted Record.
     */
    async softDeleteById(id) {
        const softDeleteUser = await this.Model.update({
            where: {
                id,
            },
            data: {
                deleted: true,
            }
        });

        return softDeleteUser;
    }
}

export default BaseRepository;