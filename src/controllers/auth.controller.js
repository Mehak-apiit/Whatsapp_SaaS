import AuthService from "../services/auth.service.js"
//const authService = new AuthService();
const authService = new AuthService();

class AuthController {
    async register(req, res, next) {
        try {
            // console.log(req.body);
            const {user,token} = await authService.register(req.body);
            res.status(201).json({success:true,message:`Please check your email ${user.email} to activate your account`,token});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error });
        }
    }

    async login(req, res) {
        try {
            const user = await authService.login(req.body);
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default AuthController;