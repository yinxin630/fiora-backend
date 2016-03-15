'use strict'

const Bcrypt = require('bcrypt-nodejs');
const Co = require('co');
const Assert = require('../utils/assert.js');
const Qiniu = require('../utils/qiniu.js');

module.exports = {
    create: function (option, res) {
        Co(function* () {
            Assert(option.username, res, 400, 'missing username param');
            Assert(option.password, res, 400, 'missing password param');
            
            let defaultGroup = yield Group.find({}).limit(1);
            let passwordHash = Bcrypt.hashSync(option.password, User.salt);
            let user = yield User.create({
                username: option.username,
                password: passwordHash,
                nickname: option.username,
                avatar: sails.config.avatar,
                linkmans: [],
                groups: [defaultGroup],
            });
            
            delete user.password;
            res.created(user);
        }).catch(err => {
            sails.log.error(err.message);
            
            let recordExists = err.message.match(/A record with that .* already exists/);
            Assert(recordExists === null, res, 400, recordExists.toString());
        });
    },
    
    find: function (option, res) {
        Co(function* () {
            let user = yield User.findOne({id: option.userId}).populate('groups').populate('linkmans');
            delete user.password;
            for (let group of user.groups) {
                let count = yield Message.count();
                group.messages = yield Message.find({skip: count - 30}).populate('from').populate('toGroup');
                for (let m of group.messages) {
                    delete m.from.password;
                }
            }
            
            for (let room of user.groups) {
                sails.sockets.join(option.req, room.id, err => {
                    if (err) {
                        sails.log('加入房间失败 option:', option);
                    }
                });
            }
            
            res.ok(user);
        }).catch(err => {
            sails.log.err(err.message);
        });
    },
    
    update: function (option, res) {
        Co(function* () {
            let user = yield User.findOne({id: option.userId});
            if (option.nickname && option.nickname !== '') {
                user.nickname = option.nickname;
            }
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
            
            user.nickname = user.nickname.slice(0, 8);
            let newUser = yield user.save();
            delete newUser.password;
            res.ok(newUser);
        }).catch(err => {
            sails.log.err(err.message);
        });
    },
    
    guest: function (option, res) {
        Co(function* () {
            let groups = yield Group.find().limit(1);
            let defaultGroup = groups[0];
            
            let count = yield Message.count();
            defaultGroup.messages = yield Message.find({skip: count - 30}).populate('from').populate('toGroup');
            for (let m of defaultGroup.messages) {
                delete m.from.password;
            }
            
            sails.sockets.join(option.req, defaultGroup.id, err => {
                if (err) {
                    sails.log('加入房间失败 option:', option);
                }
            });
            
            res.ok({
                id: 'guest' + Math.floor(Math.random() * 100007),
                username: '',
                password: '',
                nickname: '游客',
                avatar: sails.config.avatar,
                linkmans: [],
                groups: [defaultGroup],
            });
        }).catch(err => {
            sails.log.err(err.message);
        });
    }
}