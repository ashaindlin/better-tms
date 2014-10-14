var request = require('request');
var cheerio = require('cheerio');

var url = 'https://duapp2.drexel.edu/webtms_du/app'

function buildForm(term, courseName, courseNumber) {
    return {
        formids: "term,courseName,crseNumb,crn",
        component: "searchForm",
        page: "Home",
        service: "direct",
        submitmode: "submit",
        submitname: "",
        term: term,
        courseName: courseName,
        crseNumb: courseNumber,
        crn: ""
    }
}

var formByNumber = buildForm("1", "", "122");
var formByName = buildForm("1", "Calculus", "");

request.post({ url: url, form: formByNumber }, function (error, request, body) {
    //console.log(body);
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
        //console.log($(this).text())
    })
    console.log(results);
});
