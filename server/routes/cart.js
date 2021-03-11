const mongoose = require('mongoose');
const cartSchema = require('../models/Cart.model');
const cartItemSchema = require('../models/CartItem.model');
const express = require('express');
const router = express.Router();


const Cart = mongoose.model('Cart', cartSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);


//add cart to DB
router.post('/cart', async (req, res) => {

    try {
        const newCart = await addCart(req.body);
        console.log(newCart);
        res.status(200).json(newCart);
    } catch (err) {
        console.log('controller:createCart err', err.message);
        res.status(500).json({
            message: 'server error'
        })
    }

});

// update existing cart
router.put('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await updateCart(id, data);
        res.json({ success: true });

    } catch (err) {
        console.log('controller: updateCart err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// get the carts
router.get('/cart', async (req, res) => {

    try {
        const carts = await fetchCart(req.query);
        res.json(carts);
    } catch (err) {
        console.log('controller getCarts err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})

// get the last cart of current user
router.get('/lastCart', async (req, res) => {

    try {
        const carts = await fetchLastCart(req.user);
        res.json(carts);
    } catch (err) {
        console.log('controller getLastCarts err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})

// get cart by id
router.get('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const result = await fetchCartId(id);
        res.json(result);
    } catch (err) {
        console.log('controller: getCartById err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// delete cart
router.delete('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteCart(id);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteCart err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});


const fetchCart = async () => {
    try {
        console.log('fetchCart');
        return await Cart.find({}).populate('user')
    } catch (err) {
        console.log('service fetchCart err', err);
    }
}
const fetchLastCart = async (userID) => {
    try {
        const oredersSchema = require('../models/orders.model');
        const Order = mongoose.model('Order', oredersSchema);

        const allOrderedCarts = await Order.find({ client: userID }).map((cartItem) => {
            return cartItem.map((cartInner) => cartInner.cart);
        });
        const lastCart = await Cart.findOne({ client: userID, _id: { $nin: allOrderedCarts } }).populate('user');
        //if the user doesnt have any cart open create a new one
        const cartResponseObject = {};

        if (lastCart === null) {
            cartResponseObject.cart = await addCart({ client: userID });
            cartResponseObject.cartItems = [];
        } else {
            cartResponseObject.cartItems = await CartItem.find({ cart: mongoose.Types.ObjectId(lastCart._id) }).
                populate({ path: 'product', select: '_id name price image categoryID' });
            cartResponseObject.cart = lastCart;
        }
        return cartResponseObject;

    } catch (err) {
        throw err;

    }
}


const fetchCartId = async (id) => {
    try {
        return await Cart.findById({ _id: mongoose.Types.ObjectId(id) }).populate('user')
    } catch (err) {
        console.log('service: fetchCartId err', err);
    }
}

const addCart = async (cart) => {
    try {
        const newCart = new Cart(cart);
        // console.log(newCart);
        return await newCart.save();
    } catch (err) {
        console.log('service: addCart err', err.message);
    }
}



const updateCart = async (id, data) => {
    try {
        const result = await Cart.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: data
        });

        return result;
    } catch (err) {
        console.log('service: updateCart err', err.message);

    }
}


const deleteCart = async (id) => {
    try {
        const result = await Cart.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        return result;
    } catch (err) {
        console.log('service:deleteCart err', err.message);

    }
}
module.exports = router;
