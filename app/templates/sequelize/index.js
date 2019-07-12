'use strict'
var Sequelize = require('sequelize')
var databaseConfig = require('../../config/database.js')
var fs = require('fs')
var path = require('path')
var app = require('../../index')
var startCase = require('lodash').startCase

if (!databaseConfig[app.settings.env]) {
  throw new Error('Database configuration object for missing for environment ' + app.settings.env)
}

var db = {}
var sequelize = new Sequelize(databaseConfig[app.settings.env])

sequelize
  .authenticate()
  .then(function () {
    global.log.info('Database connection has been established successfully.')
  })
  .done()

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file))
    var startCaseName = startCase(model.name).replace(/\s/g, '')
    db[startCaseName] = model
  })

Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db)
  }

  if (typeof db[modelName].setDefaultScope === 'function') {
    db[modelName].setDefaultScope(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
