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
	// description: String, -- removed from latest iteration
	// habittype: { 		-- removed from latest iteration
    //     type: String,
    //     enum: ['Simple', 'Complex']
    // },
	habitcategory: {
        type: String,
        enum: ['First Things First', 'Physical Renewal', 'Productivity', 'Happy Home', 'Mental Renewal', 'Relationships']
	},
	created: {
		type: Date,
		default: Date.now
	},
	startdate: {
		type: Date,
		default: Date.now() + 86400000 //this is to make it so the default start date is the next day
	},
	targetend: {
		type: Date,
		default: Date.now() + 1814000000 //this is to account for all simple habits ending 21 days after today by default.
	},
	actualend: {
		type: Date 
		},
	reminder: {
		type: Date, 
	},
	streakcounter: {
		type: Number,
		default: 1 // used for tracking how many continous days a Habit is performed
	},
	updatedAt: {
		type: Date
	},
	customreminder: {
		type: Date, // might not be needed
	},
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