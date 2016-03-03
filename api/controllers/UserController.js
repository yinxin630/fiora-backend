/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict'

module.exports = {
	create: function(req, res) {
        let username = req.param('username');
        let password = req.param('password');
        
        UserService.create({
            username: username,
            password: password,
        }, res);
    },
    
    find: function (req, res) {
        let userId = req.user;
        
        UserService.find({
            userId: userId,
        }, res);
    },
    
    findOne: function (req, res) {
        res.notImplement();
    },
    
    update: function (req, res) {
        res.notImplement();
    },
    
    destroy: function (req, res) {
        res.notImplement();
    }
};

