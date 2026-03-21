import express from "express";
const v1Router = express.Router();
import authRouter from "./auth.route.js";
//http://localhost:4001/api/v1/auth
v1Router.use("/auth",authRouter);
export default v1Router;