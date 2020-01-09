const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb://volor:nazann62!@ds259738.mlab.com:59738/heroku_1xft465m',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  mongoose.connection.on('open', () => {
    //console.log('mongodb:connected');
  });
  mongoose.connection.on('error', err => {
    console.log('mongodb:error', err);
  });
  mongoose.Promise = global.Promise;
};
