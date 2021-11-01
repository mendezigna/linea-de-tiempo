const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimelineMediaSchema = new Schema({
    url : {type : String, required : true},
    caption : String,
    credit : String,
    thumbnail : String,
    alt : String,
    title : String,
    link : String,    
    link_target : String,
}, {collection: 'TimelineMedia'})

module.exports = mongoose.model('TimelineMedia', TimelineMediaSchema);