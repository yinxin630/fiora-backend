/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

module.exports = {
    create: function(req, res) {
        let option = {
            token: req.param('token'),
            isToGroup: req.param('isToGroup'),
            from: req.param('from'),
            to: req.param('to'),
            type: req.param('type'),
            content: req.param('content'),
            socketId: req.socket
        };
        
        return MessageService.create(option, res);
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
        res.notImplement();
    }
};

