import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    lastLogin:{
        type: Date,
        default: Date.now
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    credit:{
        type: Number,
        default: 0,
        required: true,
    },
    claims:{
        type: Number,
        default: 0,
        required: true,
    },
    withdrawals:{
        type: Number,
        default: 0,
        required: true,
    },
    lastFaucetClaim: Number,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    transactions: [{
        id: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            enum: ['Incoming', 'Outgoing'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        note: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }],
},{timestamps: true});

export const User = mongoose.model('User', userSchema);