# NodeJs Redmine Feedback

A module to integrate [Redmine](http://redmine.org) as feedback platform in your NodeJs project.

## Motivation

We develop new products and need fast feedback from our users. We already had a Redmine instance running and thought that
we should store the feedback within Redmine, too.

## Description

This little module provides a POST route to integrate the great project management tool Redmine in your NodeJs project as
feedback platform. The route will send a request to your Redmine instance and create a new feedback ticket with the
parameter you provide.

The module should be working with any NodeJs project that is based on the http module pattern (req, res, next).
Currently only ExpressJs is tested.

## Environment variables

At the moment we use only environment variables for any configurations. The list of all variables:

* **REDMINEURL** - the url to the redmine instance - mandatory
* **REDMINEAUTHTOKEN** - the access-token for the redmine instance - mandatory [Redmine Auth](http://www.redmine.org/projects/redmine/wiki/Rest_api#Authentication)

* **REDMINETICKETPROJECTID** - project id of the tickets - mandatory
* **REDMINETICKETTRACKERID** - tracker id of the tickets - mandatory
* **REDMINETICKETSUBJECT** - subject of the tickets - mandatory
* **REDMINETICKETPRIORITYID** - priority of the tickets - mandatory


## POST parameters

* **message** - the content of the ticket

## Usage

```javascript

const express = require('express'),
      request = require('supertest'),
      bodyParser = require('body-parser'),
      redmine-feedback = require('redmine-feedback');

let app = express();

//body-parser
app.use(bodyParser.json());

//require the module
app.post('/feedback', redmine-feedback .handlePOST);

//add your stuff here

app.set('port', process.env.PORT || 3500);

//start the server
const server = app.listen(app.get('port'), function () {
  debug('redmine-feedback running on ' + server.address().port);
});


```

Now you can send a post request to http://localhost:3500/feedback to create a feedback ticket in your redmine instance.

## Tests

``` npm tests ```

## Contributors

* Nicolas Traeder
* Haithem Bel Haj

## License

The MIT License (MIT)

Copyright (c) 2016 Nicolas Traeder, Haithem Bel Haj

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
