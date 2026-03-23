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
    async findByIdentifier(identifier){
        return await User.findOne({
            $or:[
                {email: identifier},
                {phone: identifier},
                {username: identifier},
            ]
        });
    }
}

export default UserRepository;