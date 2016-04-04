/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

module.exports = {
    create: function(req, res) {
        let isGuest = req.param('isGuest');
        let isToGroup = req.param('isToGroup');
        let option = {
            from: req.param('from'),
            to: req.param('to'),
            type: req.param('type'),
            content: req.param('content'),
            socketId: req.socket
        };
        
        if (isGuest) {
            if (isToGroup) {
                return MessageService.guestToGroup(option, res);
            }
            else {
                return MessageService.guestToPerson(option, res);
            }
        }
        else {
            if (isToGroup) {
                return MessageService.userToGroup(option, res);
            }
            else {
                return MessageService.userToPerson(option, res);
            }
        }
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

