const standardResponses = require('./standardResponses')
module.exports = function () {
  return function (req, res, next) {
    res.http200 = standardResponses.http200
    res.http400 = standardResponses.http400
    res.http401 = standardResponses.http401
    res.http404 = standardResponses.http404
    next()
  }
}
