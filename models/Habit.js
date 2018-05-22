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
	habittype: { 			// removed from latest strategic direction, only simple
        type: String,
        enum: ['Simple', 'Complex']
    },
	habitcategory: {
        type: String,
        // enum: ['First Things First', 'Physical Renewal', 'Productivity', 'Happy Home', 'Mental Renewal', 'Relationships']
    },
	startdate: {
		type: Date,
		default: Date.now() + 86400000 //this is to make it so the default start date is the next day
	},
	targetenddate: {
		type: Date,
		default: Date.now() + 1814000000 //this is to account for all simple habits ending 21 days after today by default.
	},
	actualenddate: {
		type: Date 
	},
	dailyremindertime: { 
		type: Date // might need to add validators depending on when Date.now() = xxx?
	},
	weeklyremindertime: {
		type: Date // might not be needed
	},
	customreminderinfo: {
		type: Date, // might not be needed
	},
	streakcounter: {
		type: Number,
		default: 1 // used for tracking how many continous days a Habit is performed
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