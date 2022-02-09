'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://### THE IP ###/portfolio')
    .then(() => {
        console.log("Connected succefully with the db");

        // Server creation
        app.listen(port, () => {
            console.log("Server running at url: localhost:3700 !")
        });

    }
    )
    .catch(err => 
        console.log(err));