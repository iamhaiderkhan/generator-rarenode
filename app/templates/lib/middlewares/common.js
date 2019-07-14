var crypto = require('crypto')
var promise = require('bluebird')
var jwt = require('jsonwebtoken')
const jwtVerify = promise.promisify(require('jsonwebtoken').verify)

module.exports = {
  getHashedPassword: function (password) {
    return crypto.createHash('sha256').update(password).digest('base64')
  },

  createToken: function (object, expiresIn) {
    let options = {}
    if (expiresIn) {
      options.expiresIn = expiresIn
    }
    return jwt.sign(object,
      global.kraken.get('app:jwtSecret'), options
    )
  },

  decodeAPiToken(token) {
    return jwtVerify(token, global.kraken.get('app:jwtSecret'))
  }
}
