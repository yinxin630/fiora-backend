/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */
const LogRequest = require('../utils/logRequest.js');

module.exports = function forbidden (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(403);
  
  // Log request 
  LogRequest(req, res);

  return res.jsonx(data);
};

