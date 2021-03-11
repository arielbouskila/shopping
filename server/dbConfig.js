const mongoose = require('mongoose');
const dbParams = {
    uri: 'mongodb://localhost:27017/shopApp',
    collection: 'sessions',
}
const connect_to_mongo_server = async () => {
    try {
        await mongoose.connect(dbParams.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("connected to mongo")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connect_to_mongo_server, dbParams }
