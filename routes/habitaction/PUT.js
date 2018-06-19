'use strict';
let Habit = require('models/Habit');
const CONST = require('components/CONST.js');

/**
 * Example PUT route handler for Express
 * This updates an existing Habit
 */
module.exports = function updateHabit(req, res, next) {
	return Habit.findOneAndUpdate({
		_id: req.params.id
	}, {
		title: req.body.title,
		description: req.body.description,
		streakCounter: req.body.streakCounter,
		updateCounter: req.body.updateCounter,
		longestStreakCounter: req.body.longestStreakCounter,
		updatedAt: req.body.updatedAt,
		habitCategory: req.body.habitCategory,
		startDate: req.body.startDate,
		targetEnd: req.body.targetEnd,
		reminder: req.body.reminder,
		activeHabit: req.body.activeHabit,	
	}).exec().then(function(results) {
		if (results) {
			return res.status(CONST.HTTP_STATUS_CODE.OK).send(results);
		} else {
			return res.sendStatus(CONST.HTTP_STATUS_CODE.NOT_FOUND);
		}
	}).catch(next);
};