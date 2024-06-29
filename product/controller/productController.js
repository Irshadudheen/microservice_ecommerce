import productModel from '../model/productModel.js'
import asyncHandler from 'express-async-handler'
import amqp from 'amqplib';


const getProduct = asyncHandler(async (req,res)=>{
    const product = await productModel.find()
    res.status(201).json(product)
})


const setProduct = asyncHandler(async (req,res)=>{
    const{name,price,quantity,image,productDescription}=req.body;
    const product = await productModel.create(req.body)
    const connection = await amqp.connect({
        hostname: "localhost",
        port: 5672,
        username: "admin",
        password: "admin123",
        vhost: "/",
    });
    const channel = await connection.createChannel();
    const queue = 'product_data';

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(product)));
    res.status(201).json(product)
})


const getEachProduct = asyncHandler( async (req,res)=>{
    const {id}= req.params
    const product = await productModel.findById(id)
    res.status(201).json(product)
})


const editProduct = asyncHandler(async (req,res)=>{
    const{name,price,status,quantity,image,productDescription}=req.body;
    const {id}=req.params;
    

})

export {getProduct,setProduct,getEachProduct,editProduct}