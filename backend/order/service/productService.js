import productDb from '../model/productDb.js'
const processProductData = async(productData)=>{
    try {
        console.log('Proccessing product data:',productData)
        await productDb.create(productData)
    
        
    } catch (error) {
        console.log(error.message)
    }
}

export {processProductData}