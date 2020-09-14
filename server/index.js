const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const model = require('../database-mongo');
const app = express();
const access_token = require('../config.js');

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/weather', (req, res) => {
  axios.get(`https://api.nasa.gov/insight_weather/?api_key=${access_token.KEY}&feedtype=json&ver=1.0`)
  .then((res) => {
    console.log('fetch API success!', res.data);
  })
  .catch(err)
});

app.get('/apod', (req, res) => {
  axios.get(`https://api.nasa.gov/planetary/apod?api_key=${access_token.KEY}`)
  .then((result) => {
    const pickedApodData = (({ title, explanation, date, url }) => ({ title, explanation, date, url }))(result.data);
    // console.log('fetch API success!', pickedApodData);
    res.status(200).send(pickedApodData);
  })
  .catch((err) => console.log(err));
});

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

