const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    IdNumber: String,
    firstName: String,
    lastName: String,
    Email: String,
    password: String,
    role: { type: Number, default: 0 },
    address: String,
    city: String
});



const User = model("user", UserSchema);

module.exports = User;



