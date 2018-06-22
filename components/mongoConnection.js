let mongoose = require('mongoose');
const CONST = require('components/CONST');

/**
 * Creates a connection to the MongoDB
 * @return {Promise}
 */
module.exports = function() {
	mongoose.Promise = Promise;

	return mongoose.connect(CONST.ENV.MONGO_DB, {
		/* other options */
		keepAlive: 1, 
		connectTimeoutMS: 30000, 
		reconnectTries: 30, 
		reconnectInterval: 5000,
	});
};
