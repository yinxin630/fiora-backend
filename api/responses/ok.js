/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 *
 * @param  {Object} data
 */

module.exports = function sendOK (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(200);

  // Log request 
  sails.log(`get ${req.path} ${res.statusCode} ${new Date - req.time}ms`);
  
  return res.jsonx(data);
};
