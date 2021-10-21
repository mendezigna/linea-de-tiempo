const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Entry = require('./entry')

const TimelineSchema = new Schema({
    title: String,
    subtitle: String,
    category: String,
    owner: String,
    collaborators: [String],
    published: Boolean,
    media: String,
    entries: { type: [Entry.schema], validate: [arrayLimit, 'There must be at least one entry']}
}, {timestamps: true, collection: 'Timeline'});


function arrayLimit(val) {
    return val.length >= 1;
  }
  

module.exports = mongoose.model('Timeline', TimelineSchema);