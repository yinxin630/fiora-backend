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
                let auth = yield Auth.findOne({token: option.token});
                
                if (auth) {
                    return res.created(auth);
                }
            }
            
            Assert(option.username, res, 400, 'missing username param');
            Assert(option.password, res, 400, 'missing password param');
            
            let user = yield User.findOne({username: option.username});
            Assert(user, res, 400, `user '${option.username}' not exists`);
            
            Assert(Bcrypt.compareSync(option.password, user.password), res, 400, `password not correct`);
            
            let loggedAuth = yield Auth.findOne({user: user.id});
            if (loggedAuth) {
                return res.created(loggedAuth);
            }
            
            let expiry = new Date().getTime() + (1000 * 60 * 60 * 24);
            const token = Crypto.createHmac('sha256', secret).update(option.username + expiry).digest('hex');
            
            let newAuth = yield Auth.create({user: user.id, token: token, expiry: expiry, socket: option.socket.id});
            Assert(newAuth, res, 500, 'login fail');
            
            res.created(newAuth);
        }).catch(err => {
            sails.log.error(err);
        });
    },
    
    destroy: function (option, res) {
        Co(function* () {
            Assert(option.token, res, 400, 'missing token');
            
            let auth = yield Auth.destroy({token: option.token});
            Assert(auth.length !== 0, res, 400, 'please login first');
            
            res.deleted({msg: 'logout success'});
        }).catch(err => {
            sails.log.error(err);
        });
    },
    
    find: function (option, res) {
        Co(function* () {
            Assert(option.token, res, 400, 'missing token');
            
            let auth = yield Auth.findOne({token: option.token});
            Assert(auth, res, 400, 'please login first');
            
            res.ok(auth);
        }).catch(err => {
            sails.log.error(err);
        });
    }
}