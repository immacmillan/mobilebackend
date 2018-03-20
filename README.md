# Node Project Template
=================
An example Express project with the following features:

* AzureAD password-based authentication with JWTs
* Data persistence with MongoDB using the Mongoose ODM
* Example CRUD HTTP endpoints
* Code coverage, unit tests and documentation

## Requirements

* [Node.js](http://nodejs.org/): 6.9.1 LTS or greater is required
* [MongoDB](http://mongodb.org/): 3.2.10 or greater is required

## Dependencies

`npm install` To install the following:

### System Dependencies

* [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Lib to help you hash passwords
* [body-parser](https://github.com/expressjs/body-parser) - Parses incoming request bodies
* [connect-mongo](https://github.com/jdesboeufs/connect-mongo) - MongoDB session store for Express and Connect
* [express](https://expressjs.com/) - Web application framework for Node.js
* [express-session](https://github.com/expressjs/session) - Session middleware for express
* [helmet](https://github.com/helmetjs/helmet) -  Secure Express apps with various HTTP headers
* [locreq](https://github.com/sealcode/locreq) -  Local Require - use relative paths with require for unit tests
* [passport](https://github.com/jaredhanson/passport) - Authentication framework for Node.js
* [mongoose](https://github.com/Automattic/mongoose) - Object Document Mapper (ODM) for MongoDB

### Development Dependencies

* [aglio](https://github.com/danielgtaylor/aglio) - An API Blueprint renderer with theme support that outputs static HTML
* [chai](http://chaijs.com/) - Chai is a BDD / TDD assertion library
* [istanbul](https://gotwarlost.github.io/istanbul/) - A Javascript code coverage tool
* [mocha](https://mochajs.org/) - Simple, flexible, fun javascript test framework for node.js
* [nsp](https://github.com/nodesecurity/nsp) - Node security platform, check for known vulnerabilities
* [sinon](http://sinonjs.org/) - Standalone test spies, stubs and mocks for JavaScript

## Documentation

Documentation is generated via [aglio](https://github.com/danielgtaylor/aglio) using the [API Blueprint](https://apiblueprint.org) Markdown format. Generated documentation can be found in the `out` directory. When the application is run in development mode (`NODE_ENV="development" npm start`) the documentation will be served at `http://localhost:7000/doc`.

## Environment

Multiple environmental variables are *required* to run the application:

* `AZURE_DIRECTORY_ID` - Azure Active Directory Tenant ID
* `AZURE_CLIENT_ID` - Azure Active Directory Client ID
* `AZURE_CLIENT_SECRET` - Azure Active Directory Client Secret Key
* `DPN_CLIENT_SECRET` - Deloitte People Network Secret Key
* `DPN_CLIENT_ID` - Deloitte People Network Client ID
* `BASIC_AUTH_USERNAME` - Username for the reporting endpoint
* `BASIC_AUTH_PASSWORD` - Password for the reporting endpoint
* `MONGO_DB`- MongoDB connect string (optional, defaults to `mongodb://localhost:27017/techfluency`)

## Running

Set the necessary env vars and run with

`npm start`

## Test

Security and dependency vulnerability scanning is done via [Node Security Project](https://nodesecurity.io). Unit testing is performed by Mocha.

Run tests with `npm test`

Run code coverage reports with `npm run coverage` code coverage reports can be found in the 'coverage' directory.
