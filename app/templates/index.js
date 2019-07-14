'use strict'
var express = require('express')
var kraken = require('kraken-js')
var path = require('path')
var asyncMiddleware = require('./app/lib/response/asyncMiddleware')
var options, app

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
  onconfig: function (config, next) {
    /*
     * Add any additional config setup or overrides here. `config` is an initialized
     * `confit` (https://github.com/krakenjs/confit/) configuration object.
     */

    next(null, config)
  }
}

app = module.exports = express()

app.use(express.static(__dirname + '/public')) // set the static files location /public/img will be /img for users
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
global.db = require('./app/models/index')
global.log = require('./app/lib/logger')
global.appRoot = path.resolve(__dirname)
global._ = require('lodash')
global.moment = require('moment')
global.asyncMiddleware = asyncMiddleware
global.commonFunctions = require('./app/lib/middlewares/common')
global.kraken = app.kraken
app.use(kraken(options))
app.on('start', function () {
  global.kraken = app.kraken
  global.log.info('Application ready to serve requests.')
  global.log.info('Environment: %s', app.kraken.get('env:env'))
})
