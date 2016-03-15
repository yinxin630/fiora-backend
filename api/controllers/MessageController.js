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
        let type = req.param('type');
        
        MessageService.create({
            from: from,
            to: to,
            isToGroup: isToGroup,
            content: content,
            type: type,
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
    },
    
    temporary: function (req, res) {
        let from = req.param('from');
        let content = req.param('content');
        let type = req.param('type');
        
        MessageService.temporary({
            from: from,
            content: content,
            type: type,
        }, res);
    }
};

