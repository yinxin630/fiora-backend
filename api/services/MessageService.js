'use strict';

const Co = require('co');
const Assert = require('../utils/assert.js');
const Qiniu = require('../utils/qiniu.js');
const FilterUser = require('../utils/filterUser.js');

const MaxMessageLength = 512;
const messageFrequencyLimit = 5;
let messageCount = {};

setInterval(() => {
    messageCount = {};
}, 10000);

module.exports = {
    create: function (option, res) {
        Co(function* (){
            Assert(option.from, res, 400, 'missing from param');
            Assert(option.to, res, 400, 'missing to param');
            Assert(option.type, res, 400, 'missing type param');
            Assert(option.content, res, 400, 'missing content param');

            let userId = option.from.id;
            if (messageCount[userId] === undefined) {
                messageCount[userId] = 0;
            }
            else {
                messageCount[userId]++;
            }
            Assert(messageCount[userId] < messageFrequencyLimit, res, 400, 'send message too often');
            
            let auth = yield Auth.findOne({token: option.token});
            if (auth) {
                option.from = {id: auth.user};
                if (option.isToGroup) {
                    return yield userToGroup(option, res);
                }
                else {
                    return yield userToPerson(option, res);
                }
            }
            else {
                if (option.isToGroup) {
                    return yield guestToGroup(option, res);
                }
                else {
                    return yield guestToPerson(option, res);
                }
            }
        }).catch(err => {
            sails.log(err);
        });
    }
};

function* guestToGroup (option, res) {
    option.content = yield handleContent(option.type, option.content);
    
    option.from.username = option.from.username + ' (游)';
    let defaultGroup = yield Group.findOne({default: true});
    let message = {
        from: option.from,
        toGroup: defaultGroup,
        time: new Date,
        content:option.content,
        type: option.type
    };
    
    sails.sockets.broadcast(defaultGroup.id, 'message', message);
    
    res.ok(message);
}

function* guestToPerson (option, res) {
    option.content = yield handleContent(option.type, option.content);
    
    option.from.username = option.from.username + ' (游)';
    let message = {
        from: option.from,
        toUser: option.to,
        time: new Date,
        content:option.content,
        type: option.type
    };
    
    let online = yield Online.findOne({user: option.to});
    if (online) {
        sails.sockets.emit(online.socket, 'message', message);
        return res.ok(message);
    }
    else {
        return res.badRequest({msg: 'user not online'});
    }
}

function* userToGroup (option, res) {
    option.content = yield handleContent(option.type, option.content);
    let defaultGroup = yield Group.findOne({default: true});
    let message = yield Message.create({
        from: option.from.id,
        toGroup: defaultGroup.id,
        time: new Date,
        content: option.content,
        type: option.type
    });
    
    message = yield Message.findOne({id: message.id}).populate('from').populate('toGroup');
    sails.log(message);
    message.from = FilterUser(message.from);
    sails.sockets.broadcast(option.to, 'message', message);
    
    res.ok(message);
}

function* userToPerson (option, res) {
    option.content = yield handleContent(option.type, option.content);
    
    let message = undefined;
    if (option.to.toString().startsWith('guest')) {
        message = {
            from: option.from,
            toUser: option.to,
            time: new Date,
            content: option.content,
            type: option.type
        };
    }
    else {
        message = yield Message.create({
            from: option.from,
            toUser: option.to,
            time: new Date,
            content: option.content,
            type: option.type
        });
        message = yield Message.findOne({id: message.id}).populate('from').populate('toGroup');
    }
    
    message.from = FilterUser(message.from);
    
    let online = yield Online.findOne({user: option.to});
    if (online) {
        sails.sockets.emit(online.socket, 'message', message);
        return res.ok(message);
    }
    else {
        return res.badRequest({msg: 'user not online'});
    }
}

function* handleContent(type, content) {
    if (type === 'text') {
        let text = content.text;
        text = text.slice(0, MaxMessageLength);
        text = text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&apos;');
        
        return {
            text: text
        };
    }
    
    if (type === 'image') {
        if (content.image.startsWith('http')) {
            return {
                text: 'image',
                image: content.image,
                width: content.width,
                height: content.height
            };
        }
        else {
            let image = content.image;
            let imageData = new Buffer(image.replace(/data:([A-Za-z-+\/]+);base64,/, ''), 'base64');
            let saved = yield Qiniu.saveBase64ToImage(imageData);
            if (!saved) {
                sails.log('save base64 avatar fail');
            }
            else {
                let imageHref = yield Qiniu.putFile(`message_${Date.now()}`);
                return {
                    text: 'image',
                    image: imageHref || image,
                    width: content.width,
                    height: content.height
                };
            }
        }
    }
}