
class AuthValidator {
    async validateRegisterRequest(req, res, next) {
        try {
            const { username, email, phone, name, password } = req.body;
            if (!email) {
                res.status(400).json({ message: "Email is required" });
            }
            if (!phone) {
                res.status(400).json({ message: "Phone is required" });
            }
            if (!username) {
                res.status(400).json({ message: "username is required" });
            }

            if (!password) {
                res.status(400).json({ message: "Password is required" });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async validateLoginRequest(req, res, next) {
        try {
            const { identifier, password } = req.body;
            if (!identifier) {
                res.status(400).json({ message: "identifier is required" });
            }
            if (!password) {
                res.status(400).json({ message: "Password is required" });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
export default AuthValidator;