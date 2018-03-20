const request = require('request'),
	CONST = require('components/CONST'),
	logger = require('./log');

module.exports = function (username, password) {
	return new Promise(function (resolve, reject) {
		return getDPNToken(username, password).then(function (accessToken) {
			return getProfile(accessToken, stripEmailDomain(username)).then(function (profileData) {
				resolve(profileData);
			});
		})
		.catch(reject);
	});
};

/**
 * Gets an OAuth Token from DPN to allow queries to be executed.
 * @param {*} username
 * @param {*} password
 */
function getDPNToken(username, password) {
	return new Promise(function (resolve, reject) {
		const opts = {
			url: CONST.ENV.DPN_AUTH_TOKEN_URL,
			method: 'POST',
			form: {
				grant_type: 'password',
				client_id: CONST.ENV.DPN_CLIENT_ID,
				client_secret: CONST.ENV.DPN_CLIENT_SECRET,
				username: username,
				password: password
			}
		};
		request(opts, function (err, response, body) {
			if (err) {
				logger.error('getDPNToken error', { 'error': err });
				return reject(err);
			}
			try {
				var tokenResponse = JSON.parse(body);
				return resolve(tokenResponse.access_token);
			} catch (jsonError) {
				return reject(jsonError);
			}

		});
	});
}

/**
 * Queries DPN to get user profile information
 *
 * @param {*} accessToken
 * @param {*} userID
 */
function getProfile(accessToken, userID) {
	return new Promise(function (resolve, reject) {
		const opts = {
			url: CONST.ENV.DPN_PROFILE_URL,
			method: 'GET',
			qs: {
				profileId: `i:0ǵ.t|adfs|${userID}`,
				includeColleagues: false
			},
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		};

		request(opts, function (err, response, body) {
			if (err) {
				logger.error('getProfile error', { 'error': err });
				return reject(err);
			}
			var profileResponse = JSON.parse(body);

			resolve(profileResponse.Data[0]);
		});
	});
}

/**
 * Removes the @ and the domain from an email address
 * @param  {String} username Email Address
 * @return {String}          Email address with everything including and after the `@` removed
 */
function stripEmailDomain(username) {
	return username.replace(/@.*/, '');
}
