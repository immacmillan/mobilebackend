'use strict';

const errorFactory = require('components/errorFactory');

/**
 * Express Authorization Middleware
 */
module.exports = function restrict(req, res, next) {
	//Check that a user session exists
	if (req && req.session && req.session.passport && req.session.passport.user) {
		next();
	} else {
		let error = new errorFactory.notAuthorized(req.ip);
		return next(error);
	}
};
