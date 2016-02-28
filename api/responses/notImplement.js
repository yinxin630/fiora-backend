const LogRequest = require('../utils/logRequest.js');

module.exports = function notImplement (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  res.status(400);

  // Log request 
  LogRequest(req, res);
  
  return res.jsonx({msg: 'interface not implement'});
};