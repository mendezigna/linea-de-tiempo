const validator = require('validator');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: {
        type: String, 
        validate: [validator.default.isEmail, 'Invalid email'], 
        unique: true
    },
    password: {
        type: String,
        minlength: 6
    }
}, {timestamps: true, collection: 'User'});

module.exports = mongoose.model('User', UserSchema);