/**
* Auth.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        user: {
            model: 'user',
            unique: true,
        },
        
        token: {
            type: 'string',
            unique: true,
        },
        
        expiry: {
            type: 'integer',
        },
        
        socket: {
            type: 'string',
        }
    }
};

