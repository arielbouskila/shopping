const mongoose = require('mongoose');
const cartSchema = require('../models/Cart.model');
const cartItemSchema = require('../models/CartItem.model');
const { isClient } = require('../validations/users.validiation');
const oredersSchema = require('../models/orders.model');

const Order = mongoose.model('Order', oredersSchema);

const express = require('express');
const router = express.Router();


//Create Order
router.post('/order', isClient, async (req, res) => {

    try {
        const newOrder = await addOrder(req.body);
        res.status(200).json(newOrder);
    } catch (err) {
        console.log('controller:createOrder err', err.message);
        res.status(500).json({
            message: 'server error'
        })
    }

});

// update 
router.put('/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await updateOrder(id, data);
        res.json({ success: true });

    } catch (err) {
        console.log('controller: updateOrder err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});
// delete order
router.delete('/order/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteOrder(id);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteOrder err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});


// get the orders
router.get('/orders', async (req, res) => {

    try {
        const orders = await fetchOrders(req.query);
        res.json(orders);
    } catch (err) {
        console.log('controller getOrders err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})

// get order by id
router.get('/order/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await fetchOrderId(id);
        res.json(result);
    } catch (err) {
        console.log('controller: getOrderById err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});




const fetchOrders = async () => {
    try {
        return await Order.find({}).populate('users').populate('carts');
    } catch (err) {
        console.log('service fetchOrder err', err);
    }
}


const fetchOrderId = async (id) => {
    try {
        return await Order.findById({ _id: mongoose.Types.ObjectId(id) }).populate('user').populate('cart');
    } catch (err) {
        console.log('service: fetchOrderId err', err);
    }
}

const addOrder = async (order) => {
    try {
        const newOrder = new Order(order);
        // console.log(newOrder);
        return await newOrder.save();
    } catch (err) {
        console.log('service: addOrder err', err.message);
    }
}



const updateOrder = async (id, data) => {
    try {
        const result = await Order.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: data
        });

        return result;
    } catch (err) {
        console.log('service: updateOrder err', err.message);

    }
}


const deleteOrder = async (id) => {
    try {
        const result = await Order.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        return result;
    } catch (err) {
        console.log('service:deleteOrder err', err.message);

    }
}

module.exports = router;