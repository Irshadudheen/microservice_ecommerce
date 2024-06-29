import mongoose  from 'mongoose';

const orderSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required:true},
        productStatus:{type:String,enum: ['Pending','Cancel', 'Return','Processing', 'Shipped', 'Delivered',"placed"], default: 'Pending'}
    },],
    paymentMethod:{type:String,require:true},
    totalPrice: { type: Number, required: true },
    date: { type: Date, required: true },
    orderStatus: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered',"placed"], default: 'Pending' },
});

export default mongoose.model('order', orderSchema)