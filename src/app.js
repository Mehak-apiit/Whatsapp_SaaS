import express from "express";
const app = express();
import apiRouter from "../src/routes/index.js";
//http://localhost:4001/api
apiRouter.use("/api", apiRouter);
export default app;