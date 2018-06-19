//pascal case becos its a class Joi
const Joi = require('joi');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//view wngines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static path
app.use(express.static(path.join(__dirname, 'public')));
var router = require('./app/route');
app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

