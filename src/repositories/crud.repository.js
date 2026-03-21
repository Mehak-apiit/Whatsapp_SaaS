class CrudRepository {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async create(data) {
        try {
            const response = await this.modelName.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async reads() {
        try {
            const response = await this.modelName.find({});
            return response;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await this.modelName.findByIdAndUpdate({ _id: id }, data, { new: true });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await this.modelName.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default CrudRepository;