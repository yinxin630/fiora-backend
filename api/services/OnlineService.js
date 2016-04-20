'use strict';

const Co = require('co');

module.exports = {
    find: function (option, res) {
        Co(function* () {
            let onlines = yield Online.find({});
            res.ok({
                count: onlines.length,
                onlines: onlines
            });
        }).catch(err => {
            sails.log.err(err);
        });
    }
};