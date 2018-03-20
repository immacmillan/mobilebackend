const request = require('request'),
	_ = require('lodash'),
	CONST = require('./CONST'),
	logger = require('./log');

const tokenURL = `${CONST.ENV.OAUTH_URL}/oauth2/token`;

module.exports = {
	getBearerTokenFromHeader: getBearerTokenFromHeader,
	getRefreshTokenFromHeader: getRefreshTokenFromHeader,
	getOAuthRefreshToken: getOAuthRefreshToken,
	getOAuthToken: getOAuthToken,
	hasValidCredentials: hasValidCredentials
};

/**
 * Additional verification of the verified key
 * Checks that the app and directory ID match
 * App ID checks that this JWT was issued by this application
 * Directory ID checks that it was issued by the Deloitte AzureAD Instance
 */
function hasValidCredentials(result) {
	return result.appid === CONST.ENV.AZURE_CLIENT_ID && result.tid === CONST.ENV.AZURE_DIRECTORY_ID;
}

/**
 * Gets an OAuth Token using a password grant from AzureAD
 * @param {*} username
 * @param {*} password
 * @returns {Promise<Object>} A promising containing the access and refresh tokens
 */
function getOAuthToken(username, password) {
	return new Promise(function (resolve, reject) {
		const opts = {
			url: tokenURL,
			method: 'POST',
			form: {
				grant_type: 'password',
				client_id: CONST.ENV.AZURE_CLIENT_ID,
				client_secret: CONST.ENV.AZURE_CLIENT_SECRET,
				resource: CONST.ENV.AZURE_CLIENT_ID,
				username: username,
				password: password
			}
		};
		request(opts, function (err, response, body) {
			if (err || body.error) {
				logger.error('getOAuthToken error', { 'error': err });
				return reject(err);
			}

			//Including try catch as trying to parse non-JSON as JSON throws an error
			try {
				var parsedBody = JSON.parse(body);
				if (parsedBody.error) {
					logJSONError(parsedBody.error, username, body);
					return reject(parsedBody);
				}
				return resolve(parsedBody);
			}
			catch(e) {
				logJSONError(e, username, body);
				return reject(parsedBody.error);
			}
		});
	});
}

/**
 * Get new OAuth Token using the Refresh Token
 */
function getOAuthRefreshToken(refreshToken) {
	return new Promise(function (resolve, reject) {
		const opts = {
			url: tokenURL,
			method: 'POST',
			form: {
				grant_type: 'refresh_token',
				client_id: CONST.ENV.AZURE_CLIENT_ID,
				client_secret: CONST.ENV.AZURE_CLIENT_SECRET,
				resource: CONST.ENV.AZURE_CLIENT_ID,
				refresh_token: refreshToken
			}
		};

		request(opts, function (err, response, body) {
			if (err) {
				logger.error('getOAuthRefreshToken error', { 'error': err });
				return reject(err);
			}
			try {
				var parsedBody = JSON.parse(body);

				if (parsedBody.error) {
					logger.error('getOAuthRefreshToken Parsing JSON', { 'error': parsedBody.error });
					reject(parsedBody.error);
				}

				return resolve(parsedBody);
			}
			catch(e) {
				logger.error('getOAuthRefreshToken Parsing JSON', { 'error': e });
			}
		});
	});
}

/**
 * Get the Bearer Token from request
 */
function getBearerTokenFromHeader(headers) {
	const authHeader = headers['authorization'];
	if (_.isNil(authHeader)) {
		return null;
	}
	return authHeader.replace('Bearer ', '');
}

/**
 * Get Refresh Token from request
 * @param  {Object} req [Express Request Object]
 * @return {String} refreshToken from header
 */
function getRefreshTokenFromHeader(headers) {
	const refreshToken = headers['refresh-token'];
	if (_.isNil(refreshToken)) {
		return null;
	}

	return refreshToken;
}

function logJSONError(errorDetail, username, body) {
	return logger.error('getOAuthToken Parsing JSON', {
		'error': errorDetail,
		'user': username,
		'body': body
	});
}
