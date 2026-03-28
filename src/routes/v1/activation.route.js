import express from "express";
const activationRouter = express.Router();
import activateAccountController from "../../controllers/activation.controller.js"



// http://localhost:4001/api/v1/activation/activate
activationRouter.post("/activate", activateAccountController);


export default activationRouter;