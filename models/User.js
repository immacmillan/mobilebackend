const mongoose = require('mongoose');

const defaultOptions = {
	timestamps: true
};

/**
 * Schema Definitions for the User Model
 * @link http://mongoosejs.com/docs/subdocs.html
 */

var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	office: String,
	zipcode: String,
	country: String,
	entity: String,
	function: String,
	email: String,
	logins: [Date],
}, defaultOptions);

/**
 * Static and Dynamic methods for the User Model
 * @type {User}
 */
class UserClass {
	/**
	 * Gets an existing user from the collection
	 * @param {String} email
	 * @return {Promise} - Resolves to user object
	 */
	static getUserByEmail(email) {
		return new Promise((resolve, reject) => {
			this.findOne({
				email: email
			}, function (err, user) {
				if (err) {
					return reject(err);
				}

				return resolve(user);
			});
		});
	}

	/**
	 * Adds a login event to the users list of logins
	 * @return {Promise}
	 */
	setLoginDate() {
		return new Promise((resolve, reject) => {
			this.logins.push(new Date());
			this.save((err) => {
				if (err) return reject(err);
				return resolve(this);
			});
		});
	}
}

userSchema.loadClass(UserClass);

module.exports = mongoose.model('User', userSchema);
