/**
 * 201 (Created) Response
 *
 * Usage:
 * return res.created();
 * return res.created(data);
 *
 * @param  {Object} data
 */

module.exports = function sendOK (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(201);
  
  // Log request 
  sails.log(`get ${req.path} ${res.statusCode} ${new Date - req.time}ms`);

  return res.jsonx(data);
};