import UserRepository from "../repositories/user.repository.js";
import jwt from "../utils/jwt.js";
const userRepository = new UserRepository();
import jwt from "../utils/jwt.js";
import bcrypt from "bcrypt";
const jwt = new jwt();
class AuthService{
    async register(data){
        try{
            const {password} = data;
            const hashPassword = await bcrypt.hash(password,10);
            data.password = hashPassword
            const user = await userRepository.create(data);
            return user;
        }catch(error){
            throw error;
        }
    }
    async login(data){
        try{
            const user = await userRepository.findByEmail(data.email);
            if(!user){
                throw new Error("User not found");
            }
            const isMatchPassword = await bcrypt.compare(data.password,user.password);
            if(!isMatchPassword){
                throw new Error("Invalid password");
            }
            const token = await jwt.jwtEncrypt({id:user.id, email:user.email});
            return {token}
        }catch(error){
            throw error;
        }
    }
    
}
export default AuthService;