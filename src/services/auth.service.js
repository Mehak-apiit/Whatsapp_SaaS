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
            name: data.name || "",
            email: data.email,
            phone: data.phone,
            userId: data.userId,
            password: hashPassword,
        };

        const user = await userRepository.create(userData);
        return user;
    }

    async login(data) {
        const identifier = data.identifier;
        const user = await userRepository.findByIdentifier(identifier);
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

