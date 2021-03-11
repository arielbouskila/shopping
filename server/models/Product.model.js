const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    product_name: String,
    price: Number,
    product_img: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    }
});



module.exports = ProductSchema