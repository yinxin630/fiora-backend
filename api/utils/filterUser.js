module.exports = function (user) {
    delete user.username;
    delete user.password;
    return user;
};