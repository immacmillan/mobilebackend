'use strict';
let Habit = require('models/Habit'),
	User = require('models/User');
const CONST = require('components/CONST.js');

/**
 * Example POST route handler for Express
 * This creates a new Habit
 */
module.exports = function addhabit(req, res, next) {
	console.log(req);
	console.log(req.user);
	var userref = req.user._id;
	var newhabit = new Habit(
		{
			title: req.body.title,
			habitcategory: req.body.habitcategory,
			habitBy: req.user._id,
			startdate: req.body.startdate,
			targetend: req.body.targetend,
			reminder: req.body.reminder,
			streakcounter: req.body.streakcounter,
			updatedAt: req.body.date,
			customreminder: req.body.customreminder,	
		}
	);

	function successfulSave(response) {
		User.findOne(userref, function (err, user) {
				if (err) console.log(err);

				user.userhabits.push(newhabit);
				user.save();
				console.log(user);
			})
		return res.status(CONST.HTTP_STATUS_CODE.CREATED).send(response)
	}
	return newhabit.save()

	.then(successfulSave)
	.catch(next);
};
