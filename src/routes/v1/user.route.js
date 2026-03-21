import expres from "express";
const userRouter = expres.Router();
import profile from "../../controllers/user.controller.js";
//import isAuthenticated from "../../middlewares/auth.middlewares.js";
import isAuthenticated from "../../middlewares/auth.middleware.js";
//http://localhost:4001/api/v1/user/profile
userRouter.get("/profile",isAuthenticated,profile);
export default userRouter;