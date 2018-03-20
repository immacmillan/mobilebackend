'use strict';

const CONST = require('components/CONST.js'),
	logger = require('components/log');
/**
 * The 'Last Stop' of the Express Middleware chain. This function should catch
 * all the errors passed by calling `next()` in previous middleware layers.
 * All error handling logic should go here so random errors aren't
 * handled in the individual route controllers.
 */
function errorHandler(err, req, res, next) {		//eslint-disable-line
	//Don't log not authorized errors
	let errorName = err.name ? err.name : 'Error';

	if (err.status !== 401) {
		let errorObj = {
			error: err
		};

		const unique_name = req.token ? req.token.unique_name : null;
		if (unique_name) {
			errorObj.user = unique_name;
		}

		if (req.ip) {
			errorObj.ip = req.ip;
		}

		logger.error(errorName, errorObj);
	}

	// Specific status codes caught
	if (err.status) {
		return res.status(err.status).send(err);
	} else {
		// Send a generic server error
		return res.status(CONST.HTTP_STATUS_CODE.SERVER_ERROR).send(err);
	}
}

module.exports = errorHandler;
