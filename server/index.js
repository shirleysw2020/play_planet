var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var model = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/mvp', function (req, res) {
  model.selectAll(function(err, data) {
    if(err) {
      console.log('server failed getting db')
      res.status(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(8008, function() {
  console.log('listening on port 8008!');
});

