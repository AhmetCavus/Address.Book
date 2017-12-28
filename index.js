'use strict';

require('dotenv').config();
var express = require('express');
var app = express();
require('./router/main.router')(app);

app.listen(process.env.PORT, () => {
    console.log(process.env.STARTLOG + process.env.PORT);
});

 // for testing with mocha
module.exports = app;