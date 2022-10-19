if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  // we are in development - return the dev keys!!!
  // module.exports = {MONGODB_URI: "mongodb://localhost/mathlibDB"};
  module.exports = {MONGODB_URI: process.env.MONGODB_URI};
}
