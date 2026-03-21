import express from "express";
const authRouter = express.Router();
import AuthController from "../../controllers/auth.controller.js"
const authController = new AuthController();
//http://localhost:4001/api/v1/auth/login
authRouter.post("/login",authController.login);
//http://localhost:4001/api/v1/auth/register
authRouter.post("/register",authController.register)
export default authRouter;