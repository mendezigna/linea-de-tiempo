require('dotenv').config()
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(401)
        } else {
            req.user = user;
            return next()
        }

    })
}

module.exports = { authenticateToken }