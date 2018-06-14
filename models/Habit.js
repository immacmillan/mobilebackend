'use strict';
let mongoose = require('mongoose'),
	Counter = require('./Counter'),
	User = require('./User');
const MSINDAY = 86400000;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./html/assets/local');


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
		default: new Date(Date.now() + MSINDAY * 1).setHours(0, 0, 0, 0) //this is to make it so the default start date is the next day
	},
	targetEnd: {
		type: Date,
		default: new Date(Date.now() + MSINDAY * 21).setHours(0, 0, 0, 0) //this is to account for all simple habits ending 21 days after today by default.
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
	longestStreakCounter: {
		type: Number,
		default: 0 // used for tracking the longest streak in the last 21 days
	},
	updatedAt: {
		type: Date,
		default: new Date(new Date().setHours(0, 0, 0, 0)),
	},
	createdAt: {
		type: Date,
		default: new Date().setHours(0, 0, 0, 0),
	},
	customReminder: {
		type: Date, // might not be needed
	},
	activeHabit: {
		type: Boolean,
	},
	customId: {
		type: Number,
		default: 1,
		required: true,
	},
});
/**
 * This function is called before a habit is saved
 */
HabitSchema.pre('save', function (next) {
	this.createdAt = new Date().setHours(0, 0, 0, 0);
	next();
});

HabitSchema.pre('save', function (next) {
	var habitCustomId = this.title;
	Counter.count({}, function (err, c) {
		if (err) return next(err);
		else if (c === 0) {
			Counter.update({
				_id: '0',
				seq: 2,
			}, {
					_id: '0',
					seq: 2,
				}, {
					upsert: true
				}).exec();
			localStorage.setItem('habitId2', 1); //for multiple users i might need a different name for the item (based on users name or maybe habit name? probably habit title and enforce unique)
		}
		else if (c !== 0) {
			Counter.findByIdAndUpdate({ _id: '0' }, { $inc: { seq: 1 } }, function (err, counted) {
				var x = counted.seq;
				localStorage.setItem('habitId2', counted.seq);
				console.log('WORKED to increment seq   -' + x + ' counted.seq --   ' + counted.seq);
			});
		}
	});
	next();
});

HabitSchema.pre('findOneAndUpdate', function () {
	this.update({}, { $set: { updatedAt: new Date().setHours(0, 0, 0, 0) } });
});

module.exports = mongoose.model('Habit', HabitSchema);

