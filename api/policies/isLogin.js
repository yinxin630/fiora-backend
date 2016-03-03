'use strict'

const Co = require('co');

module.exports = function(req, res, next) {
    Co(function* () {
        let token = req.param('token');
        if (!token) {
            return res.badRequest({msg: 'please login first'});
        }
        
        let auth = yield Auth.findOne({token: token});
        if (!auth) {
            return res.badRequest({msg: 'please login first'});
        }
        
        req.user = auth.user;
        next();
    }).catch(err => {
        sails.log.error(err);
    });
};