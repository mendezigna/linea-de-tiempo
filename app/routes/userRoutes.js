const express = require('express')
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const {authenticateToken} = require('../middleware/middlewares');
const user = require('../models/user');

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

router.put('/changepassword', authenticateToken, async (req, res) =>{
    const {newPassword, oldPassword} = req.body
    const userMail = req.user.email
    if (!newPassword || !oldPassword || (oldPassword == newPassword)) return res.status(400).json({invalidPassword: 'CONFLICT'})
    User.updateOne({email : userMail, password: oldPassword}, {password : newPassword}).then(result => {
        if (result.modifiedCount==0){
            return res.status(400).json({ invalidPassword: 'INVALID' })
        }else{
            return res.status(200).send()
        }
    }).catch(error => {
        return res.status(500).json({ invalidPassword: 'ERROR' })
    })
})

module.exports = router