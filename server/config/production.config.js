const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

module.exports.mongoDBStore = new MongoDBStore({
    uri: 'mongodb://localhost/tazkr',
    collection: "sessions"
});