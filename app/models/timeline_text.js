const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimelineTextSchema = new Schema({
    headline : String, 
    text : String, 
}, {collection: 'TimelineText'})

module.exports = mongoose.model('TimelineText', TimelineTextSchema);