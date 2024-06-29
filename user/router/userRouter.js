import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import {register,auth,getUserProfile,updataUserProfile} from '../controller/userController.js'
const Router = express();
Router.post('/register',register)
Router.post('/login',auth)
Router.post('/profile',protect,getUserProfile)
Router.put('/profile',protect,updataUserProfile)
export default Router