'use strict'

module.exports = function(req, res, next) {
    let token = req.param('token');
    if (!token) {
        return res.badRequest({msg: 'please login first'});
    }
    
    let auth = Auth.findOne({token: token});
    if (!auth) {
        return res.badRequest({msg: 'please login first'});
    }
    
    next();
};