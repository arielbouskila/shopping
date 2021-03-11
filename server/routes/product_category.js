const express = require('express');
const router = express.Router();
const { Category } = require('../models/Category.model');
const mongoose = require('mongoose');
const ProductSchema = require("../models/Product.model")
const Product = mongoose.model("Products", ProductSchema);




//get all  product categories 
router.get('/', async (req, res) => {
    const category = await Category.find({});
    res.status(200).json({ category })
})

//get product categories by ID 
router.get('/byCategory/:id', async (req, res) => {
    try {
        const { id } = req.params
        const Products = await Product.find({ category: id }).populate({ path: 'product' })
        res.send({ Products })
    } catch (error) {
        console.log(error);
    }

})


// add product-category
router.post("/add", async (req, res) => {
    try {
        const { category } = req.body;
        console.log(Category)
        const newCategory = new Category({
            category_name: category
        });
        newCategory.save((err, category) => {
            if (!err) {
                res.status(200).send(category);
            } else res.status(400).send({ error: true, err })
        });
    } catch (error) {
        console.log(error);
    }
});


module.exports = router





