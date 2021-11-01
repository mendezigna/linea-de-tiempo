const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timelineEra = require('./timeline_era');
const timelineSlide = require('./timeline_slide');
const Scale = require('../utils/scale');


const TimelineSchema = new Schema({
    events: { type: [timelineSlide.schema], validate: [arrayLimit, 'There must be at least one entry']},
    title: timelineSlide.schema,
    eras: { type: [timelineEra.schema]},
    scale: {type: String, enum : Scale},

    category: String,
    owner: String,
    collaborators: [String],
    published: Boolean,
}, {timestamps: true, collection: 'Timeline'});


function arrayLimit(val) {
    return val.length >= 1;
  }
  

module.exports = mongoose.model('Timeline', TimelineSchema);