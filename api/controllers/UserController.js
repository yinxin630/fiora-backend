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
    }
};

