'use strict'

const Co = require('co');

module.exports = {
    create: function (option, res) {
        Co(function* () {
            if (option.content === '') {
                return res.ok({msg: 'no content'});
            }
            
            let auth = yield Auth.findOne({token: option.token});
            let comment = yield Comment.create({
                from: auth.user,
                content: option.content,
                time: new Date,
            });
            res.ok(comment);
        }).catch(err => {
            sails.log.err(err);
        })
    },
    
    find: function (option, res) {
        Co(function* () {
            let comments = yield Comment.find({sort: 'createdAt DESC'}).populate('from').limit(30);
            res.ok(comments);
        }).catch(err => {
            sails.log.err(err);
        })
    }
}