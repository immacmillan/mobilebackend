/**
 * Express Authenticate Middleware
 * This takes a OAuth Token from the Authorization header
 * Then verifies that it was signed using the azure-ad-jwt package
 * Once verified we check that its not expired,
 * then check that the token is for this app id and this directory id
 *
 * If expired, then check for a refresh token to see if we can reissue a token
 */

const _ = require('lodash'),
	azureAdJwt = require('azure-ad-jwt'),
	errorFactory = require('components/errorFactory'),
	CONST = require('components/CONST'),
	oauth = require('components/OAuth'),
	logger = require('components/log');

module.exports = function restrict(req, res, next) {
	const bearerToken = oauth.getBearerTokenFromHeader(req.headers);

	if (_.isNil(bearerToken)) {
		return next(errorFactory.notAuthorized(req.ip));
	}

	azureAdJwt.verify(bearerToken, {}, function (err, tokenResult) {
		if (err) {
			if (err.name === CONST.ERROR.TOKEN_EXPIRED) {
				// If the token is expired, let's check for refresh
				const refreshToken = oauth.getRefreshTokenFromHeader(req.headers);

				if (_.isNil(refreshToken)) {
					return next(errorFactory.notAuthorized(req.ip));
				}

				return oauth.getOAuthRefreshToken(refreshToken).then(function (refreshTokenResult) {
					res.set('Set-Authorization', refreshTokenResult.access_token);
					res.set('Set-Refresh', refreshTokenResult.refresh_token);

					return next();
				})
					.catch(function (err) {
						logger.error('Get Refresh Token error', { 'error': err });
						return next(errorFactory.notAuthorized(req.ip));
					});
			} else {
				return next(errorFactory.notAuthorized(req.ip));
			}
		}
		if (oauth.hasValidCredentials(tokenResult)) {
			//Include the valid, decrypted token in the req object
			req.token = {};
			req.token.unique_name = tokenResult.unique_name;
			return next();
		}
		else {
			return next(errorFactory.notAuthorized(req.ip));
		}
	});
};
