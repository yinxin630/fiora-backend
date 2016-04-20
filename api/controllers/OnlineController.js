/**
 * OnlineController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

module.exports = {
    create: function(req, res) {
        res.notImplement();
    },
    
    find: function (req, res) {
        return OnlineService.find({}, res);
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

