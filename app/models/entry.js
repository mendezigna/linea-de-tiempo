const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    title: String,
    date: {
        year : Number, 
        month : Number, 
        day : Number, 
        ac: { 
            type : Boolean, 
            default: true
        }
    },
    text: String
},{ timestamps: true, collection: 'Entry'})

module.exports = mongoose.model('Entry', EntrySchema);