const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const model = require('../database-mongo');
const app = express();
const access_token = require('../config.js');

app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/weather', (req, res) => {
  axios.get(`https://api.nasa.gov/insight_weather/?api_key=${access_token.KEY}&feedtype=json&ver=1.0`)
  .then((res) => {
    // console.log('fetch API success!', res.data);
  })
  .catch(err)
});

app.get('/apod', (req, res) => {
  axios.get(`https://api.nasa.gov/planetary/apod?api_key=${access_token.KEY}&date=2020-09-14`)
  .then((result) => {
    const pickedApodData = (({ title, explanation, date, url }) => ({ title, explanation, date, url }))(result.data);
    console.log('fetch API success!', pickedApodData);
    // const tempData = {
    //   title: "Corn Moon Rising",
    //   explanation: "A rising moon can be a dramatic sight. A rising Full Corn Moon was captured early this month in time-lapse with a telephoto lens from nearly 30 kilometers away -- making Earth's ascending half-degree companion appear unusually impressive. The image was captured from Portugal, although much of the foreground -- including lights from the village of Puebla de Guzmán -- is in Spain. A Full Corn Moon is the name attributed to a full moon at this time of year by cultures of some northern indigenous peoples of the Americas, as it coincides with the ripening of corn. Note that the Moon does not appear larger when it is nearer the horizon -- its seemingly larger size there is only an illusion. The next full moon -- occurring at the beginning of next month -- will be known as the Full Harvest Moon as it occurs nearest in time to the northern autumnal equinox and the northern field harvests.",
    //   date: "2020-09-14",
    //   url: "https://apod.nasa.gov/apod/image/2009/CornMoonRising_Palma_960.jpg"
    // }
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

