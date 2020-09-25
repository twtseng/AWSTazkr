const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

module.exports.mongoDBStore = new MongoDBStore({
    uri: 'mongodb+srv://tazkr_admin:b5217dfd-023c-48b1-b5d1-67474f57bd39@cluster0.06dtp.azure.mongodb.net/tazkr',
    collection: "sessions"
});