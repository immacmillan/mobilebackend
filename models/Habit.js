'use strict';
let mongoose = require('mongoose'),
	User = require('./User');
const MSINDAY = 86400000;


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
		enum: ['Simple', 'Complex'],
		default: 'Simple'
    },
	habitCategory: {
        type: String,
    },
	startDate: {
		type: Date,
		default: new Date(Date.now() + MSINDAY*1).setHours(0,0,0,0) //this is to make it so the default start date is the next day
	},
	targetEnd: {
		type: Date,
		default: new Date(Date.now() + MSINDAY*21).setHours(0,0,0,0) //this is to account for all simple habits ending 21 days after today by default.
	},
	actualend: {
		type: Date 
		},
	reminder: {
		type: Date, 
	},
	updateCounter: {
		type: Number,
		default: 0 // used for tracking how many continous days a Habit is performed
	},
	streakCounter: {
		type: Number,
		default: 0 // used for tracking how many continous days a Habit is performed
	},
	longestStreakCounter:{
		type: Number,
		default: 0 // used for tracking the longest streak in the last 21 days
	},
	updatedAt: {
		type: Date,
		default: new Date(new Date().setHours(0,0,0,0)),
	},
	createdAt: {
		type: Date,
		default: new Date().setHours(0,0,0,0),
	},
	customReminder: {
		type: Date, // might not be needed
	},
	activeHabit: {
		type: Boolean,
	}
});

/**
 * This function is called before a habit is saved
 */
HabitSchema.pre('save', function (next) {
	this.createdAt = new Date().setHours(0,0,0,0);
	next();
});

/**
 * This function is called before a habit is found and updated
 */
HabitSchema.pre('findOneAndUpdate', function () {
	this.update({}, { $set: { updatedAt: new Date().setHours(0,0,0,0) } });
});


module.exports = mongoose.model('Habit', HabitSchema);