// imports
const { connect_to_mongo_server, dbParams } = require('./dbConfig');
const express = require('express');
const cors = require("cors")
const userRoute = require('./routes/users')
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const session_secret = "my_secret_hohova"
const cookieConfig = { secure: false, httpOnly: false, maxAge: 1000 * 60000 }


const {
    localStrategyHandler,
    serializeUser,
    deserializeUser,
    isValid,
} = require("./authPassport");


const MongoDBStore = require('connect-mongodb-session')(session);

// setup
const app = express();
connect_to_mongo_server();

// middleweres
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json())

app.use(cookieParser())
app.use(session({
    secret: session_secret,
    resave: true,
    saveUninitialized: true,
    store: new MongoDBStore(dbParams),
    cookie: cookieConfig
})
)

app.use(passport.initialize());
app.use(passport.session());


passport.use("local", new LocalStrategy(localStrategyHandler));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use('/users', userRoute);
app.use('/products', require('./routes/products'));
app.use('/category', require('./routes/product_category'));
app.use('/cart', require('./routes/cart'));
app.use('/order', require('./routes/order'));
app.use('/cart-item', require('./routes/cartItem'));
app.use("*", isValid);

app.listen(3000, () => {
    console.log('Serving on port 3000')
})

