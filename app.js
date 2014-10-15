var express = require('express');
var terms = require('./terms');

var app = express();

// Declare routes
app.get('/terms', terms.list);
// TODO add routes to get courses by name or number

// Start app
var port = process.env.PORT || 5000;
app.listen(port);
console.log("Listening on port " + port);
