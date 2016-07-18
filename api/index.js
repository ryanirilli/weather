'use strict';
const express      = require('express');
const request      = require('request');
const bodyParser   = require('body-parser');

const port           = 8888;
const forecastApiKey = process.env.FORECAST_API_KEY;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/weather', (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  const url = `https://api.forecast.io/forecast/${forecastApiKey}/${lat},${lng}`;
  request.get(url, (error, response, body) => {
    res.status(200).send(body);
  });
});

console.log(`Listening on ${port}`);
app.listen(port);
