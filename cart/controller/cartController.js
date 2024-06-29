import cartModel from '../model/cartModel.js'
import asyncHandler from 'express-async-handler'
import productModel from '../model/productModel.js'
const addToCart = asyncHandler( async (req,res)=>{
    const{clientId}=req
    const{id}=req.params

    const product = await productModel.findById(id)
    const cart = await cartModel.findOne({clientId})
    const checkProductInCart = cart.products.some(product=>product.productId==id)
    if(checkProductInCart){
        res.status(409)
        throw new Error("the product already added in cart")
    }
    if(!product){
        res.status(401)
        throw new Error("the product not found")
        
    }
    if(!cart){
        res.status(401)
        throw new Error("the cart not created")
    }
    
    cart.products.push({quantity:1,productId:product._id})
    await cart.save()
    console.log('product:',product)
    res.status(201).json(cart)
})
 const removeFromCart = asyncHandler(async (req,res)=>{
    const{id}=req.params
    const{clientId}=req;
    const removecart = await cartModel.findOneAndUpdate({clientId},{$pull:{products:{productId:id}}},{new:true})
    if(removecart){

        res.status(201).json(removecart)
    }

 })
 

 const getUserCart = asyncHandler(async (req,res)=>{
    const{clientId}=req;
    const Cart = await cartModel.findOne({clientId}).populate({
        path:'products.productId',
        model:'product',
        match:{status:true}
        
    });
    console.log(Cart)
    const cartObj = Cart.toObject()
    if(!cartObj){
        res.status(409)
        throw new Error("the Cart not created")
    }
    cartObj.products.forEach(product=>{

        if(product.quantity>product.productId.quantity){
            product.quantity=product.productId.quantity
        }

        product.productPrice=product.productId.price;
        console.log(product.productPrice)
        product.totalPrice=product.productPrice*product.quantity;

    })
    cartObj.totalPrice=cartObj.products.reduce((total,product)=>{
        return total + product.totalPrice
    },0)
    console.log(Cart.totalPrice)
 
    res.status(201).json(cartObj)

})
 
 export {addToCart,removeFromCart,getUserCart}