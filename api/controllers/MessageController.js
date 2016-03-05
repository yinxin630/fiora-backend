/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict'

module.exports = {
	create: function(req, res) {
        let from = req.param('from');
        let to = req.param('to');
        let isToGroup = true;
        let content = req.param('content');
        
        MessageService.create({
            from: from,
            to: to,
            isToGroup: isToGroup,
            content: content,
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
        res.notImplement();
    }
};

