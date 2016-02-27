module.exports = function (result, res, statusCode, message) {
    if (result === undefined || result === null || result === false) {
        res.status(statusCode);
        res.json({msg: message});
        throw new Error(message);
    }
}