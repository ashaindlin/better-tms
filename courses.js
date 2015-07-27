var request = require('request');
var cheerio = require('cheerio');
var form = require('./form');

module.exports.getCourses = function(req, res) {
    if(!req.query.term) {
        res.status(400).send('Bad request: query must include a term');
    } else if(!req.query.name && !req.query.number && !req.query.crn) {
        res.status(400).send('Bad request: query must include a course name, ' +
                'course number, or CRN.');
    } else {
        var url = form.url;
        var name = req.query.name || '';
        var number = req.query.number || '';
        var crn = req.query.crn || '';
        var formdata = form.buildForm(req.query.term, name, number, crn);
        request.post({ url: url, form: formdata }, function (error, request, body) {
            $ = cheerio.load(body);
            var results = {};
            var i = 0;
            //console.log("New request");
            $(".even, .odd").each(function() {
	            var obj = {};
                var j = 0;
                if (crn == '')
                {
	                $(this).find('td[valign="center"], td[valign=top]').each(function() {
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
	                            break;
	                        case 5:
	                            obj['coursetitle'] = $(this).text();
	                            break;
	                        case 6:
                                console.log($(this).text());
	                            obj['instructor'] = $(this).text().replace("  ", " ");
	                            break;
	                        default:
	                            break;
	                    }
	                    j++;
                	})
                }
                else
                {
	                $(this).find('td [valign="center"]').each(function() {
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
	                            break;
	                        case 5:
	                            obj['coursetitle'] = $(this).text();
	                            break;
	                        case 6:
	                            obj['instructor'] = $(this).text().replace("  ", " ");
	                            break;
	                        default:
	                            break;
	                    }
	                    j++;
                	})
                }

                if("subjectcode" in obj)
                {
	                var k = 0;
	                $(this).find('td [colspan="2"]').each(function() {
		                $(this).find('table').each(function(){
			                $(this).find('tr').each(function(){
				                $(this).find('td').each(function(){
					                switch (k) {
				                        case 0:
				                            obj['meetingday'] = [$(this).text()];
				                            break;
				                        case 1:
				                            obj['meetingtime'] = [$(this).text()];
				                            break;
				                        case 2:
				                        	if($(this).next().text().indexOf("Final Exam:") > -1)
				                        	{
					                        	obj['finalday'] = $(this).text();
				                        	}
				                        	else
				                        	{
					                        	obj['meetingday'].push($(this).text());
				                        	}
				                        	break;
				                        case 3:
				                        	if($(this).text().indexOf("Final Exam:") > -1)
				                        	{
					                        	obj['finaltime'] = $(this).text().replace("Final Exam:", "");
				                        	}
				                        	else
				                        	{
					                        	obj['meetingtime'].push($(this).text());
				                        	}
				                        	break;
				                        default:
				                            break;
				                    }
				                    k++;

								})
			                })
		                })
	                })
                }


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
