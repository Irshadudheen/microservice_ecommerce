import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import DbUrl from './connection/mongo.js'
import router from './router/cartRouter.js'
import cookieParser from 'cookie-parser';
import {consumeUserData,consumeProductData} from './utils/rabbitmqConsumer.js'
const app = express()
DbUrl()
const startConsume = ()=>{
    consumeProductData()
    consumeUserData()
}
startConsume()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use('/',router)

app.listen(4042,()=>console.log('the server is running on 4042 of cart'))