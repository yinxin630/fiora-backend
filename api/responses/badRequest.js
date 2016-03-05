/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 *
 */
const LogRequest = require('../utils/logRequest.js');

module.exports = function badRequest(data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(400);

  // Log request 
  LogRequest(req, res);

  return res.jsonx(data);
};

