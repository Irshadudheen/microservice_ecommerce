import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import Dburl from './connections/mongo.js'
import router from './router/productRouter.js'

const app = express()
Dburl()
app.use(cors())
app.use(express.json())

app.use('/',router)
app.listen(4041,()=>console.log('the server is runnig on 4041 product'))