import { Router } from "express";
import {addToCart,removeFromCart,getUserCart} from '../controller/cartController.js'
import {protect} from '../middleware/authMiddleware.js'
const router = Router()

router.patch('/cart/:id',protect,addToCart)
router.delete('/cart/:id',protect,removeFromCart)
router.get('/cart',protect,getUserCart)


export default router