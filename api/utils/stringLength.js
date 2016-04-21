'use strict';

module.exports = function (str) {
    let length = str.length;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 0xff) {
            length++;
        }
    }
    return length;
};