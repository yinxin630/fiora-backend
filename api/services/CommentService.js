'use strict';

const Co = require('co');
const FilterUser = require('../utils/filterUser.js');

module.exports = {
    create: function (option, res) {
        Co(function* () {
            if (option.content === '') {
                return res.ok({msg: 'no content'});
            }
            
            let comment = yield Comment.create({
                from: option.user,
                content: option.content,
                time: new Date
            });
            res.ok(comment);
        }).catch(err => {
            sails.log.err(err);
        });
    },
    
    find: function (option, res) {
        Co(function* () {
            let comments = yield Comment.find({sort: 'createdAt DESC'}).populate('from').limit(30);
            for (let comment of comments) {
                comment.from = FilterUser(comment.from);
            }
            
            res.ok(comments);
        }).catch(err => {
            sails.log.err(err);
        });
    }
}