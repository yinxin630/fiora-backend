/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

module.exports = {
    create: function (req, res) {
        AuthService.create({
            username: req.param('username'),
            password: req.param('password'),
            token: req.param('token'),
            socket: req.socket
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
        AuthService.destroy({
            token: req.param('token')
        }, res);
    }
};

