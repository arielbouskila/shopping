const { isClient } = require('../validations/users.validiation');
const cartSchema = require('../models/Cart.model');
const express = require('express');
const mongoose = require('mongoose');
const cartItemSchema = require('../models/CartItem.model');
const productsSchema = require('../models/Product.model');
const router = express.Router();


const CartItem = mongoose.model('CartItem', cartItemSchema);
const Products = mongoose.model('Products', productsSchema);




router.post('/cart-item', async (req, res) => {

    try {
        const newCartItem = await addCartItem(req.body);
        console.log(newCartItem);
        res.status(200).json(newCartItem);
    } catch (err) {
        console.log('controller:createCartItem err', err.message);
        res.status(500).json({
            message: 'server error'
        })
    }

});

// update cart-item 

router.put('/cart-item/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await updateCartItem(id, data);
        res.json({ success: true });

    } catch (err) {
        console.log('controller: updateCartItem err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});
// delete cartItem-client
router.delete('/cart-item/:id', isClient, async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteCartItem(id);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteCartItem err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// delete All CartItems- client
router.delete('/cart-items/:cartID', isClient, async (req, res) => {
    try {
        const { cartID } = req.params;
        const result = await deleteAllCartItems(cartID);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteAllCartItems err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// get the carts items
router.get('/cart-item', async (req, res) => {

    try {
        const cartItems = await fetchCartItem(req.query);
        res.json(cartItems);
    } catch (err) {
        console.log('controller getCartsItems err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})


// get cart-item by id

router.get('/cart-item/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        const result = await fetchCartItemId(id);
        res.json(result);
    } catch (err) {
        console.log('controller: getCartItemById err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});



const fetchCartItem = async () => {
    try {
        return await CartItem.find({}).populate('product').populate('cart')
    } catch (err) {
        console.log('service fetchCartItem err', err);
    }
}


const fetchCartItemId = async (id) => {
    try {
        return await CartItem.findById({ _id: mongoose.Types.ObjectId(id) }).populate('product').populate('cart')
    } catch (err) {
        console.log('service: fetchCartItemId err', err);
    }
}

const addCartItem = async (cartItem) => {
    try {
        const seletedCartItem = await CartItem.findOne({ cart: mongoose.Types.ObjectId(cartItem.cart), product: cartItem.product }).populate('product').select('price');
        if (seletedCartItem) {
            seletedCartItem.quantity = cartItem.quantity;
            seletedCartItem.generalPrice = cartItem.quantity * seletedCartItem.product.price;
            return await updateCartItem(seletedCartItem._id, seletedCartItem);
        }

        const product = await Products.findById({ _id: mongoose.Types.ObjectId(cartItem.product) });
        cartItem.generalPrice = product.price * cartItem.quantity
        const newCartItem = new CartItem(cartItem);
        // console.log(newCartItem);
        return await newCartItem.save();
    } catch (err) {
        throw err;
        console.log('service: addCartItem err', err.message);
    }
}


const updateCartItem = async (id, data) => {
    try {
        const result = await CartItem.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: data
        });

        return result;
    } catch (err) {
        console.log('service: updateCartItem err', err.message);

    }
}


const deleteCartItem = async (id) => {
    try {
        const result = await CartItem.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        return result;
    } catch (err) {
        console.log('service:deleteCartItem err', err.message);

    }
}
const deleteAllCartItems = async (cartID) => {
    try {
        const result = await CartItem.deleteMany({ cart: mongoose.Types.ObjectId(cartID) });
        return result;
    } catch (err) {
        console.log('service:deleteAllCartItems err', err.message);

    }
}

module.exports = router;