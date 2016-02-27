/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(err);
 *
 */

module.exports = function notFound (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(404);

  // Log request 
  sails.log(`get ${req.path} ${res.statusCode} ${new Date - req.time}ms`);
  
  return res.jsonx(data);
};

