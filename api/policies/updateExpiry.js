'use strict'

const Co = require('co');

module.exports = function(req, res, next) {
    Co(function* () {
        let token = req.param('token');
        if (!token) {
            return next();
        }
        
        let auth = yield Auth.findOne({token: token});
        if (!auth) {
            return next();
        }
        
        auth.expiry = new Date().getTime() + (1000 * 60 * 60 * 24);
        yield auth.save();
        next();
    }).catch(err => {
        sails.log.error(err);
    });
    
};