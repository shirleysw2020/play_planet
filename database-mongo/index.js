var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mvp');

var db = mongoose.connection;

db.on('error', function() {console.log('mongoose connection error');});
db.once('open', function() {console.log('mongoose connected successfully');});

var cardSchema = mongoose.Schema({
  id: Number,
  picture: String
});

var Card = mongoose.model('Item', cardSchema);

var selectAll = function(callback) {
  Card.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.Card = Card;
module.exports.selectAll = selectAll;