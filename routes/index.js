'use strict';
let authenticate = require('middleware/authenticate.js');
let errorHandler = require('middleware/errorHandler');
let cors = require('middleware/cors');
var path = require('path');

/**
 * Top-level route definitions
 * Maps endpoint URLs to route handler modules
 * Also sets the CORS headers and error handler
 */
module.exports = function(app) {
	// app.use(cors); // this is used for local and commented out for prod right now
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
	app.delete('/habitaction/:id', require('./habitaction/DELETE'));
	app.put('/habitaction/:id', require('./habitaction/PUT'));
	/**
	 * Routes used to handle Password reset from 'Forgot Password' use case
	 */
	// app.get('/forgot', require('./forgot'));
	app.post('/forgot', require('./forgotPost'));
	// app.get('/reset/:token', require('./reset'));
	// app.post('/reset/:token', require('./resetPost'));
	app.post('/reset', require('./reset'));
	/**
	 * Routes used to handle PW Reset from 'More' Page
	 */
	app.post('/moreReset', require('./moreReset'));

	/**
	 * Used to generate HTML for resetting PW from forgot email link
	 */
	//var html_dir = './html/';
	var pathe = path.resolve(__dirname,'../html/resetmypw.html');

	app.get('/resetmypw/:token', function (req, res){ 
		res.sendFile(pathe);
		// res.sendfile(html_dir + 'resetmypw.html');
	});
	var groupat3x = path.resolve(__dirname,'../html/assets/group@3x.png');
	app.get('/resetmypw/assets/groupat3x', function(req,res){
		res.sendFile(groupat3x);
	});
	var resetpwimg = path.resolve(__dirname,'../html/assets/resetPassword.png');
	app.get('/resetmypw/assets/', function(req,res){
		res.sendFile(resetpwimg);
	});
	app.use(errorHandler);
};
