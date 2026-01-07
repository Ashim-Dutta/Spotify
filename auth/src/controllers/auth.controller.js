import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import _config from "../config/config.js";
import { publishToQueue } from "../broker/rabbit.js";


export async function register(req, res) {
    
    const {email, password, fullName:{firstName, lastName}, role="user"} = req.body

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
        },
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role,
        fullname: user.fullName,
    }, _config.JWT_SECRET, { expiresIn: "2d" })


    await publishToQueue("user_created", {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
    })
    
    res.cookie("token", token)
    
    res.redirect('http://localhost:5173')
}

export async function googleAuthCallback(req, res) {
    const user = req.user

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { email: user.emails[0].value },
            {googleId:user.id}
        ]
    })
 
    if(isUserAlreadyExist){
        const token = jwt.sign({
            id: isUserAlreadyExist._id,
            role: isUserAlreadyExist.role,
            fullname: isUserAlreadyExist.fullName,
        },_config.JWT_SECRET, { expiresIn: "2d" })
    
        res.cookie("token", token)
        
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: isUserAlreadyExist._id,
                email: isUserAlreadyExist.email,
                fullName: isUserAlreadyExist.fullName,
                role: isUserAlreadyExist.role
            }
        })
    }

    const newUser = await userModel.create({
        googleId: user.id,
        email: user.emails[0].value,
        fullName: {
            firstName: user.name.givenName,
            lastName: user.name.familyName
        }
    })

    const token = jwt.sign({
        id: newUser._id,
        role: newUser.role,
        fullname: newUser.fullName,
    },_config.JWT_SECRET, { expiresIn: "2d" })
    
    res.cookie("token", token)
    
    res.redirect('http://localhost:5173')

}

export async function login(req, res) {
    const {email, password} = req.body

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(400).json({
            message: "User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role,
        fullname: user.fullName,
    }, _config.JWT_SECRET, { expiresIn: "2d" })

    res.cookie("token", token)
    
    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        }
    })
}