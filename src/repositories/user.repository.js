import User from "../models/user.model.js";
import CrudRepository from "../repositories/crud.repository.js";
class UserRepository extends CrudRepository {
    constructor(){
        super(User);
    }
}
export default UserRepository;