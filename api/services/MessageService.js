'use strict'

const Co = require('co');
const Assert = require('../utils/assert.js');
const Qiniu = require('../utils/qiniu.js');

const MaxMessageLength = 512;

module.exports = {
    create: function (option, res) {
        Co(function* (){
            Assert(option.from, res, 400, 'missing from param');
            Assert(option.to, res, 400, 'missing to param');
            Assert(option.isToGroup, res, 400, 'missing isToGroup param');
            Assert(option.content, res, 400, 'missing content param');
            
            option.content = option.content.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&apos;');
            if (option.type === 'text') {
                option.content = option.content.slice(0, MaxMessageLength);
            }
            
            if (option.type === 'image') {
                let imageData = new Buffer(option.content.replace(/data:([A-Za-z-+\/]+);base64,/, ''), 'base64');
                let saved = yield Qiniu.saveBase64ToImage(imageData);
                if (!saved) {
                    sails.log('save base64 avatar fail');
                }
                else {
                    let imageHref = yield Qiniu.putFile(`message_${Date.now()}`);
                    option.content = imageHref || option.content;
                }
            }
            
            let message = yield Message.create({
                from: option.from,
                toGroup: option.to,
                time: new Date,
                content: option.content,
                type: option.type,
            });
            
            let messageResult = yield Message.findOne(message).populate('from').populate('toGroup');
            delete messageResult.from.password;
            sails.sockets.broadcast(option.to, 'message', messageResult);
            
            res.ok(messageResult);
        }).catch(err => {
            sails.log(err.message);
        });
    },
    
    temporary: function (option, res) {
        Co(function* (){
            Assert(option.content, res, 400, 'missing content param');
            
            option.content = option.content.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&apos;');
            if (option.type === 'text') {
                option.content = option.content.slice(0, MaxMessageLength);
            }
            
            if (option.type === 'image') {
                let imageData = new Buffer(option.content.replace(/data:([A-Za-z-+\/]+);base64,/, ''), 'base64');
                let saved = yield Qiniu.saveBase64ToImage(imageData);
                if (!saved) {
                    sails.log('save base64 avatar fail');
                }
                else {
                    let imageHref = yield Qiniu.putFile(`guest_message_${Date.now()}`);
                    option.content = imageHref || option.content;
                }
            }
            
            let defaultGroups = yield Group.find().limit(1);
            let message = {
                from: option.from,
                toGroup: defaultGroups[0],
                time: new Date,
                content: option.content,
                type: option.type,
            };
            
            sails.sockets.broadcast(defaultGroups[0].id, 'message', message);
            
            res.ok(message);
        }).catch(err => {
            sails.log(err.message);
        });
    }
}