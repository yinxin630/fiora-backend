module.exports = function sendOK (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Log request 
  sails.log(`get ${req.url} ${res.statusCode} ${new Date - req.time}ms`);
  
  return res.jsonx(data);
};