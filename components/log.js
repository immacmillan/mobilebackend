'use strict';
const winston = require('winston'),
	CONST = require('./CONST');

require('winston-mongodb');

const mongo_options = {
	db: CONST.ENV.MONGO_DB
};

/**
 * Winston Logger Multi-Transport Logging!
 * Logs errors and whatever else we want to log to the console
 * and to the database
 * @link https://github.com/winstonjs/winston
 * Log Levels : @link https://tools.ietf.org/html/rfc5424#page-11
*/
module.exports = new (winston.Logger)({
	transports: [
		new winston.transports.Console(),
		new winston.transports.MongoDB(mongo_options)
	],
	exitOnError: false
});
