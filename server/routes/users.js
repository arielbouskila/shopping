const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const createHashedPassword = require('../auth')
const passport = require("passport");
const { isValid } = require('../authPassport')


// register and add user to DB
router.post('/register', async (req, res, next) => {
    let { IdNumber, firstName, lastName, Email, password, address, city } = req.body;
    password = createHashedPassword(password)
    if (!password) {
        res.json({ ok: false })
        return;
    }

    const user = new User({
        IdNumber, firstName, lastName, Email, password, address, city
    })
    await user.save();
    res.json({ user: { ...user._doc, id: user._id.toString(), password: "" } })
});

//login
router.post('/login', passport.authenticate('local' ,{}), (req, res) => {
    res.send({
        message: 'login successeded',
        user: req.user
    })
})

router.get('/currentUser', isValid, (req, res) => {
    res.json({
        user: req.user
    });
})
router.get('/home', function (req, res) {
    return res.status(200).json(req.user)
});

//logout
router.get('/logout', function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.sendStatus(400);
        }
        req.logout();
        res.cookie("connect.sid", req.cookies["connect.sid"], { maxAge: -1 });
        res.status(200).json(null);
    });

});



router.post('/valid', async (req, res) => {
    const { IdNumber } = req.body;
    const users = await User.find({ IdNumber: IdNumber })
    if (users) {
        res.json({ userExists: true })
        return
    }
    res.json({ userExists: false })
})




//check if user password and username is valid



module.exports = router;