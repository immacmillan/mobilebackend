'use strict';
let Habit = require('models/Habit'),
    User = require('models/User').model('User');
const CONST = require('components/CONST.js');

/**
 * Request handler for the logout endpoint
 * Clears the session and destroys the req.user property
 */
module.exports = function forgot(req, res, next) {
	req.render('forgot', {
            user: req.user
            });
        }
