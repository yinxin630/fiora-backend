'use strict'

const Qiniu = require('node-qiniu');
const Base64Image = require('node-base64-image');

Qiniu.config({
    access_key: 'tzNHpTrZu8Df4LTk_zEYObEfkvX0_FhEPog8_8zI',
    secret_key: 'c3HgVyWrv9idXCLood-c_33sX8KLZdPD67LDNXlV'
});

const Bucket = Qiniu.bucket('fiora');

module.exports = {
    saveBase64ToImage: function (imageData) {
        return new Promise((resolve, reject) => {
            Base64Image.base64decoder(imageData, {filename: '.tmp/temp'}, (err, saved) => {
                if (err) {
                    return reject(false);
                }
                return resolve(true);
            })
        });
    },

    deleteFile: function (key) {
        return new Promise((resolve, reject) => {
            let avatar = Bucket.key(key);
            avatar.remove(err => {
                if (err) {
                    return resolve(false);
                }
                return resolve(true);
            });
        });
    },

    putFile: function (key) {
        return new Promise((resolve, reject) => {
            Bucket.putFile(key, '.tmp/temp.jpg', (err, reply) => {
                if (err) {
                    return resolve(undefined);
                }
                return resolve(`http://7xrutd.com1.z0.glb.clouddn.com/${reply.key}?v=${Date.now()}`);
            });
        });
    }
}