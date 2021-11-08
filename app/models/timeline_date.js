const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimelineDateSchema = new Schema({
    year : {type : Number, required: true, min : 1},
    month : {type : Number, min : 1, max : 12},
    day : {type : Number, min : 1},
    hour : {type : Number, min : 0, max : 23},
    minute : {type : Number, min : 0, max : 59},
    second : {type : Number, min : 0, max : 59},
    milisecond : {type : Number, min : 0, max : 999},    
    display_date : String,
    ad: {type : Boolean, default: true}
}, {collection: 'TimelineDate'})

module.exports = mongoose.model('TimelineDate', TimelineDateSchema);