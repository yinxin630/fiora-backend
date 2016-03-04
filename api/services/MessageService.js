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
            
            let message = yield Message.create({
                from: option.from,
                toGroup: option.to,
                time: new Date,
                content: option.content,
            });
            
            let messageResult = yield Message.findOne(message).populate('from').populate('toGroup');
            sails.sockets.broadcast(option.to, 'message', messageResult);
            
            res.ok(messageResult);
        }).catch(err => {
            sails.log(err.message);
        });
    }
}