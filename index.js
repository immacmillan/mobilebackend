'use strict';

require('app-module-path').addPath(__dirname + '/');

let express = require('express');
let app = express();
let mongoConnection = require('components/mongoConnection');
const CONST = require('components/CONST');

require('./config/conf')(app);
require('./config/passport')(app);

require('./routes')(app);

mongoConnection().then(() => {
  app.listen(CONST.ENV.PORT, () => {
    console.log(`Express listening on port ${CONST.ENV.PORT}`);
  });
})
.catch((err) => {
  console.log(err);
});

if(process.env.NODE_ENV === 'development') {
  require('./documentation');
  app.use('/doc', express.static('out'));
}
