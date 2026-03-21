import User from "../models/user.model.js";
import CrudRepository from "../repositories/crud.repository.js";


class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }
    async findByEmail(email) {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;