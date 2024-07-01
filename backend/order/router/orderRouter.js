import {Router} from 'express'

import {placeOrder} from '../controller/orderController.js'
const router = Router()
router.get('/placeOrder/:id',placeOrder)
export default router