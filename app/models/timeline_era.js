const timelineDate = require('./timeline_date');
const timelineText = require('./timeline_text');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimelineEraSchema = new Schema({
    start_date : {type : timelineDate.schema, required : true},
    end_date : {type : timelineDate.schema, required : true},
    text : timelineText.schema
}, {collection: 'TimelineEra'})

module.exports = mongoose.model('TimelineEra', TimelineEraSchema);