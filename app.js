var express = require('express');
var courses = require('./scrape');
var terms = require('./terms');

var app = express();

// Declare routes
app.get('/terms', terms.list);
app.get('/courses', courses.getCourses);

// Start app
var port = process.env.PORT || 5000;
app.listen(port);
console.log("Listening on port " + port);
