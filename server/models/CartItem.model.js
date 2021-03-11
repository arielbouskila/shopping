const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({

    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    quantity: {
        type: Number, default: 1
    },
    generalPrice: Number,


}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



module.exports = cartItemSchema;