import express from "express";
const v1Router = express.Router();
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";

// http://localhost:4001/api/v1/auth
v1Router.use("/auth", authRouter);

// http://localhost:4001/api/v1/user
v1Router.use("/user", userRouter);

export default v1Router;