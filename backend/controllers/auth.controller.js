import bcryptjs from 'bcryptjs';
import crypto from "crypto";
import { User } from '../models/user.model.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEamil,sendResetSuccessEmail } from '../mailtrap/emails.js'


export const signup = async (req, res) => {
    const {email, password, name} = req.body;
    try{
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({success:false, message:"User already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 26 * 60 * 60 * 100, //24 hours
            facuetClaim: Date.now() - 24 * 60 * 60 * 1000, // Set to 24 hours behind the current time
            credit: 0,
        })

        await user.save();

        // jwt
        generateTokenAndSetCookie(res,user._id);

        sendVerificationEmail(user.email,verificationToken);

        res.status(200).json({
            success:true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch(error){
        return res.status(400).json({success:false, message:error.message});
    }
}


export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user){
            return res.status(400).json({success:false, message: "Invalid or expired verification code"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        res.status(200).json({success:true, message: "Email verified successfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        });
    } catch(error){
        console.log('error in verifyEmail: ', error)
        res.status(400).json({success:false, message: "server error"});
    }
}

export const login = async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({success:false, message: "Invalid credentials"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false, message: "Invalid credentials"});
        }

        generateTokenAndSetCookie(res,user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success:true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch(error){
        console.log('error in logging in: ', error)
        res.status(400).json({success:false, message: "server error"});
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success:true,message:"Logged out successfully"});
}

export const forgotpassword = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({success:false, message: "Use not found"});
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send email
        await sendPasswordResetEamil(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            success:true,
            message: "Password reset link sent to your email",
        });
    } catch(error){
        res.status(400).json({success:false, message: error.message});
    }
}

export const resetPassword = async (req, res) => {
    try{
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user){
            return res.status(400).json({success:false, message: 'Invalid or expired reset token'});
        }

        // update password
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined; 
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success:false, message: 'Password reset successful'});
    } catch(error){
        console.log('Error in resetpassword: ', error)
        res.status(400).json({success:false, message: error.message});
    }
}

export const checkAuth = async (req, res) => {
    try{
        const user = await User.findById(req.userID).select("-password")
        if (!user){
            return res.status(400).json({success:false,message:"User not found"})
        }

        res.status(200).json({
            success:true,
            user
        });
    } catch(error){
        console.log('Error in check auth: ', error)
        res.status(400).json({success:false, message: error.message});
    }
}