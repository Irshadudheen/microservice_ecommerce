import expressAsyncHandler from 'express-async-handler';
import Cart  from  '../model/cartModel.js'; 
import productModel from '../model/productModel.js';

const processUserData = async (userData) => {
    try {
      
  
        console.log("Processing user data:", userData);

        // Example: Add user data to the cart database
        // You need to replace this logic with your actual implementation
        const userCart = await Cart.findOne({ clientId: userData._id });
        if (!userCart) {
            // If no cart exists for the user, create a new one
            await Cart.create({ clientId: userData._id, products: [] });
        }

        // Add additional logic to process user data as needed
    } catch (error) {
        console.error('Error processing user data:', error.message);
    }
};
const processProductData = expressAsyncHandler(async (productData)=>{
    console.log('Proccessing product data:',productData)
    await productModel.create(productData)

})

export  { processUserData ,processProductData};
