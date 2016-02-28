module.exports = function (req, res) {
    sails.log(`${req.method} ${req.url} ${res.statusCode} ${new Date - req.time}ms`);
}