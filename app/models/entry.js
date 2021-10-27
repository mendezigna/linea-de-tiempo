const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    title: String,
    date: {
        year : Number, 
        month : Number, 
        day : Number, 
        ce: { 
            type : Boolean, 
            default: true
        }
    },
    text: String,
    media: String
},{ timestamps: true, collection: 'Entry'})

module.exports = mongoose.model('Entry', EntrySchema);