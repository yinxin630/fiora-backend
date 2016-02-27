'use strict'

const Co = require('co');
const Assert = require('../utils/assert.js');
const Crypto = require('crypto');
const Bcrypt = require('bcrypt-nodejs');

const secret = '$VkiMsLCxC8yPcSXKLNuqqe';

module.exports = {
    create: function (option, res) {
        Co(function* () {
            if (option.token) {
                let token = yield Token.findOne({token: option.token});
                
                if (token && token.expiry < new Date().getTime()) {
                    return res.created(token);
                }
            }
            
            Assert(option.username, res, 400, 'missing username param');
            Assert(option.password, res, 400, 'missing password param');
            
            let user = yield User.findOne({username: option.username});
            Assert(user, res, 400, `user '${option.username}' not exists`);
            Assert(Bcrypt.compareSync(option.password, user.password), res, 400, `password not correct`);
            
            let expiry = new Date().getTime() + 60 * 60 * 24;
            const token = Crypto.createHmac('sha256', secret).update(option.username + expiry).digest('hex');
            let newToken = yield Token.create({token: token, expiry: expiry});
            Assert(newToken, res, 500, 'create token fail');
            
            let newAuth = yield Auth.create({user: user.id, token: newToken, socket: option.socket.id});
            Assert(newAuth, res, 500, 'login fail');
            
            res.created(newToken);
        }).catch(err => {
            sails.log.error(err.message);
        });
    }
}