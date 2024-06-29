import express from 'express'
import dotenv from 'dotenv/config'
import cookieParser from 'cookie-parser';
import Dburl from './connections/mongo.js'
import Router from './router/userRouter.js'
import cors from 'cors'
import { errorhandler,notfound } from './middleware/errorHandler.js'
const app = express()
Dburl()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("user")
})
app.use('/',Router)
app.use(errorhandler)
app.use(notfound)

app.listen(4040,()=>console.log('the server is running in 4040'))