const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    "name": "<%= appname %>",
    "level": 10,
});
