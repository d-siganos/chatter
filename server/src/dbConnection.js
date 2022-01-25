const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

if (process.env.NODE_ENV !== 'development') {
  require('dotenv').config();
}

const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatter';
const connect = mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = connect;
