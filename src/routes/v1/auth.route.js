import express from "express";
const authRouter = express.Router();
import AuthController from "../../controllers/auth.controller.js"
const authController = new AuthController();
import AuthValidator from "../../validators/auth.validator.js";
const authvalidator = new AuthValidator();
//http://localhost:4001/api/v1/auth/login
authRouter.post("/login",authvalidator.validateLoginRequest,authController.login);
//http://localhost:4001/api/v1/auth/register
authRouter.post("/register",authvalidator.validateRegisterRequest,authController.register)
export default authRouter;