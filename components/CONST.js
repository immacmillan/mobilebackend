'use strict';

/**
 * Map of constant values used throughout the application
 * @type {Object}
 */
/* istanbul ignore next */
module.exports = {
  HTTP_STATUS_CODE : {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST : 400,
    UNAUTHENTICATED: 401,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    UNSUPPORTED_MEDIA_TYPE: 415,
    READ_TIMEOUT: 408,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    CONNECT_TIMEOUT: 504
  },
  CONTENT_TYPES : {
    JSON: 'application/json',
    FORM: 'application/x-www-form-urlencoded'
	},
	ENV: {
		AZURE_DIRECTORY_ID: process.env.AZURE_DIRECTORY_ID,
		AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID,
		AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET,
		DPN_CLIENT_SECRET: process.env.DPN_CLIENT_SECRET,
		DPN_CLIENT_ID: process.env.DPN_CLIENT_ID,
		OAUTH_URL: `https://login.microsoftonline.com/${process.env.AZURE_DIRECTORY_ID}`,
		DPN_AUTH_TOKEN_URL: 'https://auth.m.us.deloitte.com/OAuth/V2/Token',
		DPN_PROFILE_URL: 'https://people.m.us.deloitte.com/o/people/GetProfileDetail'
	},
	MONGO_DB: {
		CONNECT_STRING: process.env.MONGO_DB || 'mongodb://localhost:27017/goals'
	},
  SIGNALS: {
    AUTH_SUCCESS: 'authentication succeeded',
    AUTH_FAILED: 'authentication failed',
    NO_AUTH: 'User is not authenticated'
  }
};
