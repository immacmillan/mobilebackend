/**
 * Login Route
 * @example
 * {
 * 		"username": "foo",
 * 		"password": "bar"
 * }
 * Returns OAuth Access and Refresh Tokens
 */
const passport = require('passport'),
	_ = require('lodash');

const errorFactory = require('components/errorFactory'),
	logger = require('components/log'),
	userProfile = require('components/userProfile'),
	User = require('models/user');

module.exports = function (req, res, next) {
	const username = _.toLower(req.body.username);
	const password = req.body.password;

	if (_.isNil(username) || _.isNil(password)) {
		return next(errorFactory.notAuthorized(req.ip));
	}
	//Passport will check the username and password values from req.body and pass them to the
	//configured auth stragety in config/passport.js
	passport.authenticate('local', function (err, info) {
		if (err || !info) {
			logger.error('Login Error', {
				'user': username,
				'ip': req.ip,
				'error': err,
				'info': info
			});
			return next(errorFactory.notAuthorized(req.ip));
		}
		//User is authenticated! Check for their record and create one if they don't have one, or add a login session to their record
		return User.getUserByEmail(username).then(function (user) {
			if (_.isNil(user)) {
				return createLocalUserRecord(username, password).then((newUser) => {
					return newUser.save(function (err) {
						if (err) {
							return next(err);
						}
						info.user = newUser;
						return res.send(info);
					});
				});
			} else {
				return user.setLoginDate().then(function (updatedUser) {
					info.user = updatedUser;
					return res.send(info);
				});
			}
		}).catch(next);

	})(req, res, next);
};

/**
 * Create a 'local' user record in our database based on the data returned from DPN
 * @param  {String} username
 * @param  {String} password
 * @return {Promise} - Promise resolved to Mongoose User model
 */
function createLocalUserRecord(username, password) {
	return new Promise(function (resolve, reject) {
		return userProfile(username, password)
			.then(function (userProfile) {
				var newUser = new User({
					email: username,
					firstName: _.startCase(userProfile.FirstName) || 'No First Name',
					lastName: _.startCase(userProfile.LastName) || 'No Last Name',
					office: _.startCase(_.toLower(userProfile.Office)) || 'No Office',
					zipcode: userProfile.OfficeAddress.PostalCode || 'No Zip',
					country: userProfile.OfficeAddress.Country || 'No Country',
					entity: _.startCase(userProfile.Entity) || 'No Entity',
					function: userProfile.Function || 'No Function',
					logins: [new Date()]
				});
				return resolve(newUser);
			}).catch(reject);
	});
}
