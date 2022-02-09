'use strict'
//Modules

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    youtube: String,
    github: String,
    arduino: Boolean,
    imagefront: [String],
    image: [String],
    image2: [String],
    image3: [String],
});

// First parameter: colection where will save the project, second: schema

// En el robo 3t la coleccion se llama "projects", pero si se lo mandamos asi tambien lo toma
module.exports = mongoose.model('Project', ProjectSchema);