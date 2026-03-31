import express from "express";
const activationRouter = express.Router();
import activateAccountController from "../../controllers/activation.controller.js"



// http://localhost:4001/api/v1/activation/activate
// request body: { "activationCode": "123456" }
activationRouter.post("/activate", activateAccountController);

// http://localhost:4001/api/v1/activation/activate?activationToken=token&activationCode=123456
// request query: { "activationToken": "token", "activationCode": "123456" }
activationRouter.get("/activate", activateAccountController);


export default activationRouter;