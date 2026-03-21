import jwt from "jsonwebtoken";

class JWTUtil {
    async jwtEncrypt(payload) {
        try {
            return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        } catch (error) {
            throw error;
        }
    }

    async jwtDecrypt(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw error;
        }
    }
}

export default JWTUtil;

