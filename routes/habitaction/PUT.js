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
		habitcategory: req.body.habitcategory,
		startdate: req.body.startdate,
		targetend: req.body.targetend,
		reminder: req.body.reminder,
		streakcounter: req.body.streakcounter,
		updatedAt: req.body.date,
		customreminder: req.body.customreminder,
		activehabit: req.body.activehabit,
	}).exec().then(function(results) {
		if (results) {
			return res.status(CONST.HTTP_STATUS_CODE.OK).send(results);
		} else {
			return res.sendStatus(CONST.HTTP_STATUS_CODE.NOT_FOUND);
		}
	}).catch(next);
};
