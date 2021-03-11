const crypto = require('crypto');
const passwordHash = "shop_secret_password0603_!@#$%"
const createHashedPassword = password =>
    crypto.createHmac('sha256', passwordHash)
        .update(password)
        .digest('hex')

module.exports = createHashedPassword