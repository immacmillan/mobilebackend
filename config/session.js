'use strict';
const crypto = require('crypto'),
	session = require('express-session'),
	CONST = require('components/CONST'),
	utils = require('components/utilities'),
	MongoStore = require('connect-mongo')(session),
	async = require('async'),
	flash = require('express-flash');

/**
 * Use Express Session and Mongo Store for session management
 * @link https://github.com/expressjs/session
 * @link https://github.com/jdesboeufs/connect-mongo
 */

module.exports = function(app) {
	const cookie_options = {
		path: '/',
		httpOnly: true,
		secure: 'auto',
		maxAge: utils.minutesToMilliseconds(CONST.ENV.DEFAULT_TIMEOUT_MINUTES)
	};

	const mongo_store_options = {
		url: CONST.ENV.MONGO_DB,
		// autoRemove: 'disabled',
	};

	const session_options = {
		cookie: cookie_options,
		resave: false,
		rolling: true,
		saveUninitialized: true,
		secret: crypto.randomBytes(64).toString('hex'), //@TODO Change to static string if this needs to scale horizontally
		store: new MongoStore(mongo_store_options)
	};
	app.use(flash());
	app.use(session(session_options));
};
