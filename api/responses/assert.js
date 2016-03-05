const LogRequest = require('../utils/logRequest.js');

module.exports = function assert (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Log request 
  LogRequest(req, res);
  
  return res.jsonx(data);
};