const { Schema, model } = require('mongoose');
const addressSchema = new Schema({
    city: String,
    street: String
});

const Address = model('Address', addressSchema)
module.exports = Address;