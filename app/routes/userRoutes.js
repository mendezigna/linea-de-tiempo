const express = require('express')
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    if (!user) {
        return res.status(400).send('Invalid email or password')
    } else {
        const token = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: "24h"});
        res.status(200)
        return res.json({ name: user.name, email, token: `Bearer ${token}` })
    }
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.sendStatus(400)
    User.create({ name, email, password }).then(result => {
        const token = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: "24h"});
        res.status(201)
        res.json({ name: result.name, email, token: `Bearer ${token}` })
    }).catch(error => {
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json(errors);
        } else {
            return res.status(409).json({ duplicated: 'Duplicated Email' })
        }
    })

})

module.exports = router