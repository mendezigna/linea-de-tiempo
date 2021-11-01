const timelineDate = require('./timeline_date');
const timelineText = require('./timeline_text');
const timelineMedia = require('./timeline_media');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimelineSlideSchema = new Schema({
    start_date : timelineDate.schema,
    end_date : timelineDate.schema,
    text : timelineText.schema,
    media : timelineMedia.schema,
    group : String,
    display_date : String,
    background : {url: String, color:String},
    autolink : Boolean,
    unique_id : String,
}, {collection: 'TimelineSlide'})

module.exports = mongoose.model('TimelineSlide', TimelineSlideSchema);