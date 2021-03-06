'use strict'

const Bcrypt = require('bcrypt-nodejs');
const Co = require('co');
const Assert = require('../utils/assert.js');
const Qiniu = require('../utils/qiniu.js');
const FilterUser = require('../utils/filterUser.js');
const strLength = require('../utils/stringLength.js');

module.exports = {
    create: function (option, res) {
        Co(function* () {
            Assert(option.username, res, 400, '请输入用户名');
            Assert(option.password, res, 400, '请输入密码');
            
            option.username = option.username.trim();
            let length = strLength(option.username);
            Assert(length > 0 && length < 17, res, 400, '用户名长度错误');
            
            let defaultGroup = yield Group.findOne({default: true});
            let passwordHash = Bcrypt.hashSync(option.password, User.salt);
            let user = yield User.create({
                username: option.username,
                password: passwordHash,
                avatar: sails.config.avatar,
                linkmans: [],
                groups: [defaultGroup]
            });
            
            res.created({id: user.id});
        }).catch(err => {
            sails.log.error(err);
            
            let recordExists = err.message.match(/A record with that .* already exists/);
            Assert(recordExists === null, res, 400, '该用户名已存在');
        });
    },
    
    find: function (option, res) {
        Co(function* () {
            let auth = yield Auth.findOne({token: option.token});
            let user = undefined;
            
            if (auth) {
                user = yield getUser(auth.user, option.socketId);
            }
            else {
                user = yield getGuest(option.socketId);
            }
            yield Online.create({user: user.id, socket: option.socketId});
            
            res.ok(user);
        }).catch(err => {
            sails.log.err(err);
        });
    },
    
    update: function (option, res) {
        Co(function* () {
            let user = yield User.findOne({id: option.userId});
            if (option.avatar && option.avatar !== '') {
                let imageData = new Buffer(option.avatar.replace(/data:([A-Za-z-+\/]+);base64,/, ''), 'base64');
                let saved = yield Qiniu.saveBase64ToImage(imageData);
                if (!saved) {
                    user.avatar = option.avatar;
                    sails.log('save base64 avatar fail');
                }
                else {
                    let delResult = yield Qiniu.deleteFile(`avatar_${user.id}`);
                    let avatarHref = yield Qiniu.putFile(`avatar_${user.id}`);
                    user.avatar = avatarHref || option.avatar;
                }
            }
            
            let newUser = yield user.save();
            res.ok({
                avatar: newUser.avatar
            });
        }).catch(err => {
            sails.log.err(err);
        });
    }
}

function* getUser (userId, socketId) {
    let user = yield User.findOne({id: userId}).populate('groups').populate('linkmans');
    
    for (let group of user.groups) {
        let count = yield Message.count({toGroup: group.id});
        group.messages = yield Message.find({toGroup: group.id, sort: 'createdAt'}).skip(count > 30 ? count - 30 : 0).populate('from').populate('toGroup');
        for (let m of group.messages) {
            m.from = FilterUser(m.from);
        }
    }
    
    for (let room of user.groups) {
        sails.sockets.join(socketId, room.id, err => {
            if (err) {
                sails.log('加入房间失败 socket id:', socketId);
            }
        });
    }
    
    return {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        linkmans: user.linkmans,
        groups: user.groups,
        socketId: socketId
    };
}

function* getGuest (socketId) {
    let defaultGroup = yield Group.findOne({default: true});
    
    let count = yield Message.count({toGroup: defaultGroup.id});
    defaultGroup.messages = yield Message.find({toGroup: defaultGroup.id, sort: 'createdAt'}).skip(count > 30 ? count - 30 : 0).populate('from').populate('toGroup');
    for (let m of defaultGroup.messages) {
        m.from = FilterUser(m.from);
    }
    
    sails.sockets.join(socketId, defaultGroup.id, err => {
        if (err) {
            sails.log('加入房间失败 socket id:', socketId);
        }
    });
    
    let randomId = Math.floor(Math.random() * 100007);
    return {
        id: 'guest' + randomId,
        username: '游客' + randomId,
        avatar: sails.config.avatar,
        linkmans: [],
        groups: [defaultGroup],
        socketId: socketId
    };
}