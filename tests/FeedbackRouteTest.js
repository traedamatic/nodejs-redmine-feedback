/**
 * FeedbackRoute Tests
 * @author Nicolas Traeder <traeder@codebility.com>
 */

'use strict';

const expect = require('chai').expect,
  sinon = require('sinon'),
  mock = require('mock-require'),
  express = require('express'),
  request = require('supertest'),
  bodyParser = require('body-parser');


describe('Feedback Route Tests', function () {

  let app;
  let requestMock;


  before(function (done) {

    //mocking the request module
    requestMock = sinon.stub();
    mock('request', requestMock);

    //create a express app
    app = express();
    app.use(bodyParser.json());

    //require the module
    let module = require('../index');
    app.post('/feedback', module.handlePOST);
    done()

  });


  it('should return a 400 error because the redmine ticket could not be created', function (done) {

    requestMock.yields(new Error('Error from redmine server'), null);

    request(app)
      .post('/feedback')
      .send({
        message: 'Feedback Test'
      })
      .set('Accept', 'application/json')
      .end(function (err, res) {

        if (err) {
          return done(err);
        }

        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');


        done();
      })

  });

  it('should return a 200', function (done) {

    requestMock.yields(null, {statusCode: 200});

    request(app)
      .post('/feedback')
      .send({
        message: 'Feedback Test'
      })
      .set('Accept', 'application/json')
      .end(function (err, res) {

        if (err) {
          return done(err);
        }

        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('ok');


        done();
      })

  })
});