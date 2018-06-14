'use strict';
let Habit = require('models/Habit'),
	Counter = require('models/Counter'),
	User = require('models/User');
const CONST = require('components/CONST.js');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./html/assets/local'); 

/**
 * Example POST route handler for Express
 * This creates a new Habit
 */
module.exports = function addhabit(req, res, next) {
	//console.log(req.user);
	var userref = req.user._id;
	var numofhabits = req.user.userhabits.length;
	//console.log(numofhabits);
	var customIdPlus = 0;
	customIdPlus += localStorage.getItem('habitId2');

	var newhabit = new Habit(

		{
			title: req.body.title,
			description: req.body.description,
			date: req.body.date,
			habitBy: req.user._id,
			habitCategory: req.body.habitCategory,
			startDate: req.body.startDate,
			targetEnd: req.body.targetEnd,
			reminder: req.body.reminder,
			streakCounter: req.body.streakCounter,
			updatedAt: req.body.updatedAt,
			customReminder: req.body.customReminder,
			activehabit: req.body.activeHabit,
			customId: customIdPlus,
		}
	);
	function successfulSave(response) {
		User.findOne(userref, function (err, user) {
			if (err) console.log(err);
			user.userhabits.push(newhabit);
			user.save();
		});
		return res.status(CONST.HTTP_STATUS_CODE.CREATED).send(response)
	}
	return newhabit.save()
		.then(successfulSave)
		.catch(next);
};
