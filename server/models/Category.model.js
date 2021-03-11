const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    category_name: String,
    
});
const Category = model("Category", CategorySchema);

module.exports = {Category}