module.exports = function(req, res, next) {
    if (req.isSocket) {
        return next();
    }
    
    res.badRequest({msg: 'please use socket to access interface'});
};