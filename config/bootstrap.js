/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
    setInterval(() => {
        Auth.destroy({expiry: {'<': new Date().getTime()}}).then(result => {
            sails.log('清理过期token:', result);
        });
    }, 300000);
    
    Group.find({}).then(result => {
        if (result.length !== 0) {
            return;
        }
        Group.create({nickname: 'Fiora', avatar: sails.config.avatar}).then(result => {
            if (result) {
                return sails.log('创建默认房间:', result);
            }
            return sails.log('创建默认房间失败');
        });
    });
    
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
