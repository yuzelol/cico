const mongoose = require('mongoose')

let HistorySchema = new mongoose.Schema({
    date: Date,
    note: String,
    user: String
})

let UnitSchema = new mongoose.Schema({
    property: String,
    room: String,
    name: String,
    agency: String,
    available: Boolean,
    priority: Boolean,
    availableSince: Date,
    completeBy: Date,
    tempNote: String,
    history: [HistorySchema]
})

let PropertySchema = new mongoose.Schema({
    name: String,
    address: String,
    agency: String,
    units: [UnitSchema]
})

let Property = mongoose.model('Property', PropertySchema, 'properties')

module.exports = Property