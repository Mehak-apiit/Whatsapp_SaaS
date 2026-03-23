import mongoose from "mongoose";
import bcrypt from "bcrypt";
import STATUS_TYPE from "../utils/enums.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        lowercase: true,
        minlength:3,
        maxlength:30
    },
     lastName: {
        type:String,
        required:true,
        lowercase: true,
        minlength:3,
        maxlength:30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    phone:{
        type: String,
        required: true,
        unique: true,
        min:10,
        max:10
    },
    username:{
        type:String,
        required:true,
        lowercase: true,
        unique: true,
        minlength: 6,
        maxlength: 30

    },
    password: {
        type: String,
        required: true,
        minlength:8,
        maxlenght:100
    },
    avatar: {
        type: String,
        default:null
    },
    status:{
        type:String,
        required: true,
        enum: [STATUS_TYPE.ACTIVE,STATUS_TYPE.INACTIVE,STATUS_TYPE.BLOCK],
        default: 'active'

    },
    lastLogin: Date,
    role: {type: String,
        required:true,
        default: "user"
    },
    permissions: {
        type:[String]
    },
    isEmailVerified:{
        type:Boolean,
        default: false

    },
}, {
    timestamps: true
});
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    const fullName = `${this.firstName} ${this.lastName}`;
    this.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model("User", userSchema);

export default User;