'use strict';
let authenticate = require('middleware/authenticate');
let errorHandler = require('middleware/errorHandler');
let cors = require('middleware/cors');

/**
 * Top-level route definitions
 * Maps endpoint URLs to route handler modules
 * Also sets the CORS headers and error handler
 */
module.exports = function(app) {
	app.use(cors);
	/**
	 * Routes used for login/out, adding users.
	 */
	app.post('/login', require('./login'));
	app.post('/logout', require('./logout'));
	app.post('/addUser', require('./AddUser'));
	/**
	 * Routes used to handle adding habits, pulling habits, 
	 * pulling habits by user, and deleting habits. 
	 */
	app.post('/habitaction', require('./habitaction/POST'));	
	app.get('/habitaction', require('./habitaction/GET'));
	app.get('/habitaction/:id', require('./habitaction/GETBY'));
	app.delete('/habitaction/:id', require('./habitaction/DELETE'));
	app.put('/habitaction/:id', require('./habitaction/PUT'));
	/**
	 * Routes used to handle Password reset from 'Forgot Password' use case
	 */
	app.get('/forgot', require('./forgot'));
	app.post('/forgot', require('./forgotPost'));
	app.get('/reset/:token', require('./reset'));
	app.post('/reset/:token', require('./resetPost'));
	/**
	 * Routes used to handle PW Reset from 'More' Page
	 */
	app.put('/moreReset', require('./moreReset'));

	app.use(errorHandler);
};
