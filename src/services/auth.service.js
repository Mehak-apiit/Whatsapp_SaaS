import UserRepository from "../repositories/user.repository.js";
import JWTUtil from "../utils/jwt.js";
import bcrypt from "bcrypt";
//import { generateActivationCode } from '../utils/activation.js';

const userRepository = new UserRepository();
const jwtUtil = new JWTUtil();
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); ``
import createActivationToken from "../utils/activation.js";
//import sendMail from "../services/email.service.js";
import sendEmail from "../services/email.service.js";

class AuthService {
    async register(data) {
        try {
            const existingUser = await userRepository.findByEmail(data.email);
            if (existingUser) {
                throw new Error("Email already exists");
            }

            //const { password } = data;
            //const hashPassword = await bcrypt.hash(password, 10);
            const userData = {
                firstName: data.firstName,
                lastName: data.lastName,
                name: data.name || "",
                email: data.email,
                phone: data.phone,
                username: data.username,
                password: data.password,

            };

            const user = await userRepository.create(userData);
            const { token, activationCode } = await createActivationToken(user);

            //const emailData = { user: { name: `${user.firstName} ${user.lastName} ` }, acivationCode: activationCode }
            const baseUrl = process.env.BASE_URL || "http://localhost:4001";
            const activationLink = `${baseUrl}/api/v1/activation/activate?activationToken=${token}&activationCode=${activationCode}`;
            const emailData = {
                user: { name: `${user.firstName} ${user.lastName} ` },
                activationCode: activationCode,
                activationLink: activationLink

            }

            const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), emailData);

            // 
            await sendEmail(
                user.email,
                "Account Activation",
                html,
                emailData
            );

            return { user, token };


        } catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                throw new Error(`Duplicate value for ${field}: ${error.keyValue[field]}`);
            }
            throw error;

        }

    }

    async login(data) {
        const identifier = data.identifier;
        const user = await userRepository.findByIdentifier(identifier);
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.isEmailVerified) {
            throw new Error("User email not verified found");
        }

        // const isMatchPassword = await bcrypt.compare(data.password, user.password);
        const isMatchPassword = await user.comparePassword(data.password);
        if (!isMatchPassword) {
            throw new Error("Invalid password");
        }

        const token = await jwtUtil.jwtEncrypt({ id: user.id, email: user.email });
        return { token };
    }
}

export default AuthService;

