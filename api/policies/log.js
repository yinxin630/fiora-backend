module.exports = function(req, res, next) {
    req.time = new Date;
    next();
};