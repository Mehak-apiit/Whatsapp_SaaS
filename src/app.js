import express from "express";
const app = express();
import apiRouter from "../src/routes/index.js";
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//http://localhost:4001/api
app.use("/api", apiRouter);
//global error handling
app.use((err,req,res,next)=> {
    console.error(err.stack)
    res.status(500).json({message:'Something went wrong'})
    next();
})
export default app;