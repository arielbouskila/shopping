const isClient = async (req, res, next) => {
    try {
        // console.log('isClient', req.user);
        // const { client } = req.user;

        if (req.user && req.user.role === 'client') {
            return next()
        }
        return res.status(401).json;

    } catch (err) {
        console.log('validation:isClient err', err.message);
        throw err;


    }
}

module.exports = { isClient }