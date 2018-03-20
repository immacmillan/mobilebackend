let mongoose = require('mongoose');
const CONST = require('./CONST');

/**
 * Creates a connection to the MongoDB
 * @param  {String} connectionString - mongoDB connection string @example 'mongodb://localhost/test'
 * @return {Promise}
 */
module.exports = function() {
	return new Promise((resolve, reject) => {
		// Use native promises
		mongoose.Promise = global.Promise;
		mongoose.connect(CONST.MONGO_DB.CONNECT_STRING);

		mongoose.connection.on('error', () => {
			return reject(new Error(`unable to connect to database: ${CONST.MONGO_DB.CONNECT_STRING}`));
		});
		mongoose.connection.once('open', () => {
			return resolve();
		});
	});
};
