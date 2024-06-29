import {Schema,model} from 'mongoose'

const cartModel = new Schema({
    clientId: { type: Schema.Types.ObjectId, required: true, ref: "client" },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'product' },
        quantity: { type:Number}, },]

})
 export default model('cart', cartModel)