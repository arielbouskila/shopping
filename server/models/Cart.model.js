const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema({

    client: { type: Schema.Types.ObjectId, ref: 'User' }



}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



module.exports = cartSchema;