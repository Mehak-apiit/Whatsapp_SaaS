import UserRepository from "../repositories/user.repository.js";
import JWTUtil from "../utils/jwt.js";
import bcrypt from "bcrypt";

const userRepository = new UserRepository();
const jwtUtil = new JWTUtil();

class AuthService {
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already exists");
        }

        const { password } = data;
        const hashPassword = await bcrypt.hash(password, 10);
        const userData = {
            email: data.email,
            password: hashPassword,
            name: data.name || ''
        };

        const user = await userRepository.create(userData);
        return user;
    }

    async login(data) {
        const user = await userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("User not found");
        }

        const isMatchPassword = await bcrypt.compare(data.password, user.password);
        if (!isMatchPassword) {
            throw new Error("Invalid password");
        }

        const token = await jwtUtil.jwtEncrypt({ id: user.id, email: user.email });
        return { token };
    }
}

export default AuthService;

