import mongoose from "mongoose";
const userSchmea = new mongoose.Schema({
    email:{
        type: String,
        required: t