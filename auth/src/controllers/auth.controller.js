import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import _config from "../../config/config";


export async function register(req, res) {
    
    const {email, password, fullName:{firstName, lastName}} = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })
    
    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await userModel.create({
        email,
        password: hashedPassword,
        fullName: {
            firstName,
            lastName
        }
    })

    const token = jwt.sign({
        id: user._id,
        role:user.role,
    }, _config.JWT_SECRET, { expiresIn: "2d" })
    
    res.cookie("token", token)
    
    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        }
    })
}