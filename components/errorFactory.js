const CONST = require('components/CONST');

module.exports = {
	badRequest: badRequest,
	notAuthorized: notAuthorized
};

/**
 * Send a 400 Error with a message
 * @return {Error}
 */
function badRequest(ip, message) {
	var error = new Error();
	error.status = CONST.HTTP_STATUS_CODE.BAD_REQUEST;
	error.message = message;
	error.ip = ip;
	return error;
}

/**
 * Send a generic 401 - unauthorized error
 * @return {Error}
 */
function notAuthorized(ip) {
	var error = new Error();
	error.status = CONST.HTTP_STATUS_CODE.UNAUTHENTICATED;
	error.ip = ip;
	return error;
}
