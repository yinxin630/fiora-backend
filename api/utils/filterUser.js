module.exports = function (user) {
    delete user.password;
    return user;
};