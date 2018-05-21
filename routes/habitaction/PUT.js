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
		date: req.body.date,
		streakCounter: req.body.streakCounter,
		updatedAt: new Date().setHours(0,0,0,0),
	}).exec().then(function(results) {
		if (results) {
			return res.status(CONST.HTTP_STATUS_CODE.OK).send(results);
		} else {
			return res.sendStatus(CONST.HTTP_STATUS_CODE.NOT_FOUND);
		}
	}).catch(next);
};
