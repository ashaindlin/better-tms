var request = require('request');
var cheerio = require('cheerio');
var form = require('./form');

module.exports.getCourses = function(req, res) {
    if(!req.query.term) {
        res.status(400).send('Bad request: query must include a term');
    } else if(!req.query.name && !req.query.number) {
        res.status(400).send('Bad request: query must include a course name ' +
                'or course number.');
    } else {
        var url = form.url;
        var name = req.query.name || '';
        var number = req.query.number || '';
        var formdata = form.buildForm(req.query.term, name, number);
        request.post({ url: url, form: formdata }, function (error, request, body) {
            $ = cheerio.load(body);
            var results = {};
            var crn = 0;
            var i = 0;
            $(".even, .odd").each(function() {
                var obj = {};
                var j = 0;
                $(this).find('td [valign=top]').each(function() {
                    switch (j) {
                        case 0:
                            obj['subjectcode'] = $(this).text();
                            break;
                        case 1:
                            obj['coursenumber'] = $(this).text();
                            break;
                        case 2:
                            obj['instrtype'] = $(this).text();
                            break;
                        case 3:
                            obj['section'] = $(this).text();
                            break;
                        case 4:
                            obj['crn'] = $(this).text();
                            crn = $(this).text();
                            break;
                        case 5:
                            obj['coursetitle'] = $(this).text();
                            break;
                        case 6:
                            obj['instructor'] = $(this).text();
                            break;
                        default:
                            break;
                    }
                    j++;
                })
                // Ignore non-course table entries
                if(Object.keys(obj).length != 0) {
                    results[i] = obj;
                    i++;
                }
            })
            res.set('Content-Type', 'application/json');
            res.send(results);
        });
    }
}
