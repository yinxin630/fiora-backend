/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

module.exports = {
    create: function(req, res) {
        UserService.create({
            username: req.param('username'),
            password: req.param('password')
        }, res);
    },
    
    find: function (req, res) {
        UserService.find({
            token: req.param('token'),
            socketId: req.socket
        }, res);
    },
    
    findOne: function (req, res) {
        res.notImplement();
    },
    
    update: function (req, res) {
        UserService.update({
            userId: req.user,
            nickname: req.param('nickname'),
            avatar: req.param('avatar')
        }, res);
    },
    
    destroy: function (req, res) {
        res.notImplement();
    }
};