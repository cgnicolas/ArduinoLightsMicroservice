const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serviceDetails = require('./config/serviceDetails');
const Registry = require('./utils/Registry');
const Arduino = require('./utils/Arduino');
require('dotenv').config();

const app = express();
const port = serviceDetails.service.port;
app.use(morgan('tiny'));
app.use(bodyParser.json());
const axios = require('axios');


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

// const client = new Arduino(process.env.ARDUINO_URL);
// client.emitter.on('ready', () => {
//     axios.request(registrationOptions)
//     .then(() => {
//         app.listen(port, () => {
//             console.log("Listening on port ", port);
//             app.use('/', require('./routes/root'));
//         })
//     })
// })

const registry = new Registry();
axios.request(registrationOptions)
.then(() => {
    app.listen(port, () => {
        console.log("listening on port: ", port);
        app.use('/', require('./routes/root'));
    })
})

module.exports = {
    registry,
    ARDUINO_URL: process.env.ARDUINO_URL
};