const LocalStrategy = require('passport-local').Strategy,
	passport = require('passport'),
	oauth = require('components/OAuth');

/**
 * Instruct Passpost to use a LocalStrategy, typically used for basic authencation,
 * We're using the LocalStragety as a wrapper for our custom OAuth implementation
 * as Local supplies a username and password-based schema that can be customized
 * @link https://github.com/jaredhanson/passport-local
 * @link https://github.com/dei79/node-azure-ad-jwt
 * @link https://github.com/AzureAD/azure-activedirectory-library-for-nodejs
 */
module.exports = function () {
	passport.use(new LocalStrategy({
		session: false
	}, function (username, password, done) {

		oauth.getOAuthToken(username, password).then(function (resp) {
			done(null, resp);
		}).catch(done);
	}));

	passport.initialize();
};
