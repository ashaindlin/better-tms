var request = require('request'),
    cheerio = require('cheerio');

// TODO send a JSON HTTP response instead of logging result to console
module.exports.getTerms = function() {
    var url = 'https://duapp2.drexel.edu/webtms_du/app';
    request(url, function(error, request, body) {
        $ = cheerio.load(body);
        var children = $('select#term').children();
        var terms = {};
        var value, data;
        children.each(function(_, child) { // we don't need the index
            value = child.attribs.value;
            data = child.children[0].data;
            terms[value] = data;
        });
        delete terms['0']; // remove 'Select a Term' default option
        console.log(terms);
    });
};
