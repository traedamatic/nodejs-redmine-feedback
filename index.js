/**
 * easy feedback integration with redmine
 */
'use strict';

const request = require('request');

/**
 * all needed information to access a redmine instance
 */
const redmineCredentials = {
  url: process.env.REDMINEURL || false,
  authToken: process.env.REDMINEAUTHTOKEN || false
};

// check if all env vars are set
if (!redmineCredentials.url
  && !redmineCredentials.authToken
) {
  throw new Error('Please enter all needed env variables')
}

/**
 * the redmine ticket details
 * @type {{project_id: (*|boolean), tracker_id: (*|boolean), subject: (*|boolean), priority_id: (*|boolean)}}
 */
const redmineTicketConfig = {
  project_id: process.env.REDMINETICKETPROJECTID || false,
  tracker_id: process.env.REDMINETICKETTRACKERID || false,
  subject: process.env.REDMINETICKETSUBJECT || false,
  priority_id: process.env.REDMINETICKETPRIORITYID || false
};


// check if all env vars are set
if (!redmineTicketConfig.priority_id
  && !redmineTicketConfig.tracker_id
  && !redmineTicketConfig.project_id
  && !redmineTicketConfig.subject
) {
  throw new Error('Please enter all needed env variables')
}

/**
 * handle the POST request
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
function handlePOST(req, res, next) {

  let requestBody = {
    issue: {
      tracker_id: redmineTicketConfig.tracker_id,
      project_id: redmineTicketConfig.project_id,
      subject: redmineTicketConfig.subject,
      description: req.body.message,
      priority_id: 2
    }
  };

  request({
    method: 'POST',
    url: `${redmineCredentials.url}/issues.json?key=${redmineCredentials.authToken}`,
    body: requestBody,
    json: true
  }, function (err, response) {

    if (err) {
      return res.status(400).json({status: 'error', message: err.message});
    }

    res.status(response.statusCode).json({status: 'ok', message: 'Ticket created'});
  });

}

/**
 *
 * @param {object} app a express app
 */
module.exports  = {
  handlePOST: handlePOST
};