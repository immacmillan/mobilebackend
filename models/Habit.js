'use strict';
let mongoose = require('mongoose'),
    User = require('./User')


var HabitSchema = mongoose.Schema({
	title: {
		type: String,
	},
	habitBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
	description: String,
	habittype: {
        type: String,
        enum: ['Simple', 'Complex']
    },
	habitcategory: {
        type: String,
        enum: ['First Things First', 'Physical Renewal', 'Productivity', 'Happy Home', 'Mental Renewal', 'Relationships']
    },
	startdate: {
		type: Date,
		default: Date.now() + 86400000 //this is to make it so the default start date is the next day?
	},
	targetenddate: {
		type: Date
	},
	actualenddate: {
		type: Date
	},
	dailyremindertime: { 
		type: Date // might need to add validators depending on when Date.now() = xxx?
	},
	weeklyremindertime: {
		type: Date
	},
	customreminderinfo: {
		type: Date,
	},
	streakcounter: {
		type: Number,
		default: 1
	},
	date: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	},
	createdAt: {
		type: Date
	}
});

/**
 * This function is called before a habit is saved
 */
HabitSchema.pre('save', function (next) {
    this.createdAt = new Date;
	next();
});

/**
 * This function is called before a habit is found and updated
 */
HabitSchema.pre('findOneAndUpdate', function () {
	this.update({}, { $set: { updatedAt: new Date() } });
});


module.exports = mongoose.model('Habit', HabitSchema);