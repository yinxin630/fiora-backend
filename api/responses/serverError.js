/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 *
 */
const LogRequest = require('../utils/logRequest.js');

module.exports = function serverError (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(500);
  
  // Log request 
  LogRequest(req, res);
    
  return res.jsonx(data);
};

