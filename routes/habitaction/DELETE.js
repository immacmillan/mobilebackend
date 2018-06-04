'use strict';
let Habit = require('models/Habit');
const CONST = require('components/CONST.js');

/**
 * Example DELETE route handler for Express
 * This deletes a Habit with the given _id
 */
module.exports = function deleteHabit(req, res, next) {

	return Habit.remove({_id: req.params.id})
				.then(() => {
					res.send({success: true, message: CONST.HTTP_STATUS_CODE.OK});
				}).catch((err) => {
					return next({
						status: CONST.HTTP_STATUS_CODE.BAD_REQUEST,
						error:{
							success:false,
							message:err
						},
					});
				});
			
};

/** Currently when you delete a habit, it gets deleted from the Habit Model, but not the User sub-document. In this way it is possible to retain history of user "attempted or previously added habits"
If we want to remove this behavior - this is a possible method using .pull to remove sub-documents (results in ref error): 
return user.userhabits.pull({_id: req.params._id}, function (err, user) {
	if (err) console.log(err);
	user.save();
	console.log(user);
})
.then(() => {
	res.sendStatus(CONST.HTTP_STATUS_CODE.OK);
}).catch((err) => {
	return next(err);
});
 */