var request = require('request');
var cheerio = require('cheerio');

var url = 'https://duapp2.drexel.edu/webtms_du/app'
var form = { formids: "term,courseName,crseNumb,crn",
             component: "searchForm",
             page: "Home",
             service: "direct",
             submitmode: "submit",
             submitname: "",
             term: "1",
             courseName: "Calculus",
             crseNumb: "122",
             crn: ""
}



request.post({ url: url, form: form }, function (error, request, body) {
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
        results[i] = obj;
        i++;
        //console.log($(this).text())
    })
    console.log(results);
});
