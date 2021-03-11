
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    totalPrice: Number,
    deliveryCity: String,
    deliveryStreet: String,
    deliveryDate: Date,
    orderDate: Date,
    paymentCardNumber: Number

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = ordersSchema;