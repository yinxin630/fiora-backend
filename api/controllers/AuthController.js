/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict'

module.exports = {
	create: function (req, res) {
        let username = req.param('username');
        let password = req.param('password');
        let token = req.param('token');
        let socket = req.socket;
        
        AuthService.create({
            username: username,
            password: password,
            token: token,
            socket: socket,
        }, res);
    },
    
	find: function (req, res) {
        res.notImplement();
    },
    
    findOne: function (req, res) {
        res.notImplement();
    },
    
    update: function (req, res) {
        res.notImplement();
    },
    
    destroy: function (req, res) {
        let token = req.headers.authorization;
        
        AuthService.destroy({
            token: token,
        }, res);
    }
};

