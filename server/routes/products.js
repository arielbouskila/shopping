const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ProductSchema = require("../models/Product.model")
const Product = mongoose.model("Products", ProductSchema);

//get all products 
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products })
});

//get products by id
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
});

//update existing product
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;
        await upadteProduct(id, product);
        res.json({ success: true });

    } catch (err) {
        console.log('controller: updateCart err', err.message)
        res.status(500).json({
            message: 'server error'
        });
    }
});

//add product 
router.post("/new", async (req, res) => {
    try {
        const { product_name, price, product_img, category } = req.body;
        console.log(product_name, price, product_img, category)
        const newProduct = new Product({
            product_name,
            price,
            product_img,
            category
        });
        newProduct.save((err, product) => {
            if (!err) {
                res.status(200).send(product);
            } else res.status(400).send({ error: true, err })
        });
    } catch (error) {
        console.log(error);
    }
});



const upadteProduct = async (id, product) => {
    try {
        const result = await Product.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: data
        });

        return result;
    } catch (err) {
        console.log('service: updateProduct err', err.message);

    }
}

module.exports = router;




