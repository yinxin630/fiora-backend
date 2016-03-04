'use strict'

const Co = require('co');
const Assert = require('../utils/assert.js');

module.exports = {
    create: function (option, res) {
        Co(function* (){
            Assert(option.from, res, 400, 'missing from param');
            Assert(option.to, res, 400, 'missing to param');
            Assert(option.isToGroup, res, 400, 'missing isToGroup param');
            Assert(option.content, res, 400, 'missing content param');
            
            sails.sockets.broadcast(option.to, 'message', option);
            res.ok(option);
        }).catch(err => {
            sails.log(err.message);
        });
    }
}