import {Schema,model} from "mongoose";
const productModel = new Schema({
    _id:{ type: Schema.Types.ObjectId, required: true},
    name:{type:String,required:true},
    price: { type: Number, required: true },
    status: { type: Boolean, required: true ,default:true},
    quantity: { type: Number, required: true },
    image: { type:String, required: true },
    productDescription: { type: String, required: true }
}) 
export default  model('product', productModel)
