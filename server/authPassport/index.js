//const mongoose = require('mongoose');
const createHashedPassword = require("./../auth");
const User = require('../models/User.model');
//const User = mongoose.model('User', userSchema)

module.exports = {
    localStrategyHandler: (username, password, done) => {
        User.findOne({ Email: username, password: createHashedPassword(password) })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                return done(null, user);
            })
            .catch(err => {
                console.log("in error")
                return done(err);
            });
    },
    serializeUser: (user, done) => {
        done(null, user);
    },
    deserializeUser: (user, done) => {
        done(null, user);
    },
    isValid: (req, res, next) => {
        console.log(req.user);
        if (req.isAuthenticated()) {
            return next();
        }
        return res.sendStatus(401);
    },
};