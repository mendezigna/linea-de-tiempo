const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Entry = require('./entry')

const TimelineSchema = new Schema({
    title: String,
    subtitle: String,
    category: String,
    entries: [Entry.schema]
}, {timestamps: true, collection: 'Timeline'});

module.exports = mongoose.model('Timeline', TimelineSchema);