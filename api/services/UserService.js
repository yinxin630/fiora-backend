'use strict'

const Bcrypt = require('bcrypt-nodejs');
const Co = require('co');
const Assert = require('../utils/assert.js');

module.exports = {
    create: function (option, res) {
        Co(function* () {
            Assert(option.username, res, 400, 'missing username param');
            Assert(option.password, res, 400, 'missing password param');
            
            let defaultGroup = yield Group.find({}).limit(1);
            let groups = [];
            groups.push(defaultGroup);
            let passwordHash = Bcrypt.hashSync(option.password, User.salt);
            let savedUser = yield User.create({
                username: option.username,
                password: passwordHash,
                nickname: sails.config.nickname,
                avatar: sails.config.avatar,
                group: groups,
            });
            res.created(savedUser);
        }).catch(err => {
            sails.log.error(err.message);
            
            let recordExists = err.message.match(/A record with that .* already exists/);
            Assert(recordExists === null, res, 400, recordExists.toString());
        });
    },
    
    find: function (option, res) {
        Co(function* () {
            let user = yield User.findOne({id: option.userId}).populate('group');
            res.ok(user);
        }).catch(err => {
            sails.log.err(err.message);
        });
    }
}