import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config'
import DbUrl from './connection/mongo.js'
import router from './router/orderRouter.js'
import {consumeProductData} from './utils/rabbitmqConnection.js'
const app = express()
const startConsume= ()=>{
    consumeProductData()
 
}
startConsume()

DbUrl()
app.use(cors())
app.use(express.json())

app.use('/',router)

app.listen(4043,()=>console.log("the server is running on 4043 order"))