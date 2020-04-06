const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serviceDetails = require('./config/serviceDetails');
require('dotenv').config();

const app = express();
const port = serviceDetails.port;
app.use(morgan('tiny'));
app.use(bodyParser.json());
const axios = require('axios');

let currentColors = {};


const registrationOptions = {
    method: 'POST',
    url: process.env.SERVER_URI + '/register',
    data: serviceDetails,
    json: true
}
const checkArduino = {
    method: 'GET',
    url: process.env.ARDUINO_URL + '/ping',
    json: true
}

axios.request(checkArduino)
.then((result) => {
    currentColors = result.data;
})
.then(() => {
    return axios.request(registrationOptions);
})
.then(() => {
    app.listen(port, () => {
        console.log("Listening on port: ", port);
        app.use('/', require('.routes/root'));
    })
})
.catch((err) => {
    console.log(err.stack);
})

module.exports = {
    currentColors
}