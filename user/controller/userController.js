import userModel from "../model/userModel.js"
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import amqp from 'amqplib';
const register = asyncHandler( async (req,res)=>{
        const {name,email,password}=req.body;
        const checkMail =await userModel.findOne({email});

        if(checkMail){
            res.status(400)
            throw new Error('User already exists');
        }
       const userData= await userModel.create({name,email,password})
       generateToken(res,userData._id)
       const connection = await amqp.connect({
        hostname: "localhost",
        port: 5672,
        username: "admin",
        password: "admin123",
        vhost: "/",
    });
    const channel = await connection.createChannel();
    const queue = 'user_data';

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(userData)));
        res.status(201).send(userData)
    }
)
const auth = asyncHandler(async (req,res)=>{
    const{email,password}=req.body
    const user = await userModel.findOne({email})
    if(!user){
        throw new Error('Email not exists')
    }
    if(await bcrypt.compare(password,user.password)){
        generateToken(res,user._id);
        res.status(201).json({_id:user._id,
            name:user.name,
            email,
        })
    }else{
        res.send(401)
        throw new Error('Invalid password')
    }
})
const getUserProfile = asyncHandler(async (req,res)=>{
    const user= {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json(user)
})
const updataUserProfile = asyncHandler( async (req,res)=>{
    const {name,email,password}=req.body;
    const checkEmail = await userModel.findOne({email})
    if(checkEmail){
        res.status(401)
        throw new Error("In this mail already have account")
    }
    const user = await userModel.findById(req.user._id)
    if(user){
        user.name = name || user.name;
        user.email = email || user.email;
        if(password){
            user.password = password
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email
        });
    }else{
        res.status(404);
        throw new Error('User not found')
    }
})
export {
    register,
    auth,
    getUserProfile,
    updataUserProfile

}