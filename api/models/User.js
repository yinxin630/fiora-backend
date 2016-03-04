/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        username: {
            type: 'string',
            unique: true,
        },
        
        password: {
            type: 'string',
        },
        
        nickname: {
            type: 'string',
        },
        
        avatar: {
            type: 'string',
        },
        
        messages: {
            collection: 'message',
        },
        
        groups: {
            collection: 'group',
        }
    },
    
    salt: '$2a$10$VkiMsLCxC8yPcSXKLNuqqe',
};

