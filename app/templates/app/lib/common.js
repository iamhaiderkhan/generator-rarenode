const crypto = require('crypto');
const promise = require('bluebird');
const jwt = require('jsonwebtoken');
const jwtVerify = promise.promisify(require('jsonwebtoken').verify);
const { appEnums } = global;

module.exports = {
    getHashedPassword: function (password) {
        return crypto.createHash('sha256').update(password).digest('base64');
    },

    createToken: function (object, expiresIn) {
        let options = {};
        if (expiresIn) {
            options.expiresIn = expiresIn;
        }
        return jwt.sign(object,
            appEnums.jwtSecret, options
        );
    },

    decodeAPiToken(token) {
        return jwtVerify(token, appEnums.jwtSecret);
    }
};
