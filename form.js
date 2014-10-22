module.exports.url = 'https://duapp2.drexel.edu/webtms_du/app';

module.exports.buildForm = function(term, courseName, courseNumber, crn) {
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
            crn: crn
    }
}
