import Jwt from "../utils/jwt.js";
const jwt = new Jwt();

async function isAuthenticated(req, res, next) {
    try {
        // cookies, authorization
        const token = req.headers["token"];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const dcrypt = await jwt.jwtDecrypt(token);

        if (!dcrypt) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        req.user = dcrypt;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default isAuthenticated;