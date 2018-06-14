'use strict';
let mongoose = require('mongoose'),
    User = require('./User'),
    Habit = require('./Habit');

var CounterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});

CounterSchema.pre('save', function (next) {
    next();
});
    

module.exports = mongoose.model('Counter', CounterSchema);

