'use strict';
let mongoose = require('mongoose'),
	User = require('./User');
const HOURSINDAY = 86400000;


var HabitSchema = mongoose.Schema({
	title: {
		type: String,
	},
	habitBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
	description: String,
	habittype: { 			// removed from latest strategic direction, only simple
        type: String,
        enum: ['Simple', 'Complex']
    },
	habitCategory: {
        type: String,
    },
	startDate: {
		type: Date,
		default: new Date(Date.now() + HOURSINDAY*1).setHours(0,0,0,0) //this is to make it so the default start date is the next day
	},
	targetEndDate: {
		type: Date,
		default: new Date(Date.now() + HOURSINDAY*21).setHours(0,0,0,0) //this is to account for all simple habits ending 21 days after today by default.
	},
	actualEndDate: {
		type: Date 
	},
	dailyReminderTime: { 
		type: Date // might need to add validators depending on when Date.now() = xxx?
	},
	weeklyReminderTime: {
		type: Date // might not be needed
	},
	customReminderInfo: {
		type: Date, // might not be needed
	},
	streakCounter: {
		type: Number,
		default: 1 // used for tracking how many continous days a Habit is performed
	},
	date: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: new Date().setHours(0,0,0,0),
	},
	createdAt: {
		type: Date,
		default: new Date().setHours(0,0,0,0),
	}
});

/**
 * This function is called before a habit is saved
 */
HabitSchema.pre('save', function (next) {
	this.createdAt = new Date().setHours(0,0,0,0);
	this.targetEndDate = new 
	next();
});

/**
 * This function is called before a habit is found and updated
 */
HabitSchema.pre('findOneAndUpdate', function () {
	this.update({}, { $set: { updatedAt: new Date().setHours(0,0,0,0) } });
});


module.exports = mongoose.model('Habit', HabitSchema);