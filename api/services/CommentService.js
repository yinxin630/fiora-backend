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
    }
}