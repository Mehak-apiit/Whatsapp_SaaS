import AuthService from "../services/auth.service.js"
const authService = new AuthService();
import { successResponse,errorResponse } from "../utils/response.js";

class AuthController {
    async register(req, res, next) {
        try {
            // console.log(req.body);
            const {user,token} = await authService.register(req.body);
            //res.status(201).json({success:true,message:`Please check your email ${user.email} to activate your account`,token});
            successResponse(res, { user, token }, "User registered successfully", 201);
        } catch (error) {
            //console.log(error)
            //res.status(500).json({ message: error });
             errorResponse(res, error, "Failed to register user", 500);
        }
    }

    async login(req, res) {
        try {
            const user = await authService.login(req.body);
            successResponse(res, user, "User logged in successfully", 200);
            //res.status(200).json({ success: true, data: user });
        } catch (error) {
            //res.status(500).json({ message: error.message });
             errorResponse(res, error, "Failed to login user", 401);
        }
    }

}

export default AuthController;