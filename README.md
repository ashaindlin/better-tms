# about

A parser/scraper/API thing for Drexel's WebTMS

**No longer being worked on/actively maintained.**

# getting started

1. clone the repo
2. run `npm install` to fetch the dependencies
3. optionally, choose a port to run on with `export PORT=1234` (with the port of
        your choice)
4. start with `node app.js`

# for users: api endpoints

## /terms

Returns a JSON object with term numbers as keys and English representations of
term names as values. Example:

```
GET /terms
{
    "1": "Fall Quarter 13-14",
    "2": "Winter Quarter 13-14",
    "3": "Spring Quarter 13-14",
    ...
    "13": "Spring Semester 14-15",
    "14": "Summer Semester 14-15"
}
```

## /courses

Returns a JSON object of all courses matching the query, indexed by integers
starting at 0.

The query string to courses must include `term` (an index from the data
returned by the `/terms` route) and one of the following: `name` (a string to
search for in course names), `number` (a number to match exactly), or `crn` (a
CRN to match exactly).

In the future, you will be able to search for all classes offered in a term.

```
GET /courses?name=applied&term=3
{
    "0": {
        "subjectcode": "CHEM",
        "coursenumber": "151",
        "instrtype": "Online",
        "section": "940",
        "crn": "30175",
        "coursetitle": "Applied Chemistry",
        "instructor": "Daniel A Kleier"
    },
    ...
}
```

```
GET /courses?number=122&term=6
{
    "0": {
        "subjectcode": "MATH",
        "coursenumber": "122",
        "instrtype": "Lecture",
        "section": "001",
        "crn": "10898",
        "coursetitle": "Calculus II",
        "instructor": "Huilan Li"
    },
    ...
}
```

```
GET /courses?crn=13622&term=1
{
    "0": {
        "subjectcode": "DSMR",
        "coursenumber": "100",
        "instrtype": "Lecture",
        "section": "001",
        "crn": "13622",
        "coursetitle": "Computer Imaging I",
        "instructor": "Diane Susan Zatz"
    }
}
```

# for developers: code structure

- app.js: Main entry point to the application. Express routes are defined here,
  and the port on which to listen for requests is chosen.
- form.js: A blank search form, a function to get a modified version of it, and
  the URL to which to send it is all stored here.
- package.json: The usual (dependencies, version number, etc).
- README.md: This file.
- courses.js: Most of the application logic, including the all-important
  `getCourses` function.
- terms.js: Get the list of all terms, indexed by number.
