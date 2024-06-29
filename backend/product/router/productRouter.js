import {Router} from 'express'
import {getProduct,setProduct,getEachProduct,editProduct} from '../controller/productController.js'
const router = Router()
router.get('/product',getProduct)
router.get('/product/:id',getEachProduct)
router.post('/addProduct',setProduct)
router.put('/product/:id',editProduct)
export default router