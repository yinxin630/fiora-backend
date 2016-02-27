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
        let token = req.headers.Authorization;
        let socket = req.socket;
        
        AuthService.create({
            username: username,
            password: password,
            token: token,
            socket: socket,
        }, res);
    },
    
    destroy: function (req, res) {
        
    }
};

