var fs = require('fs')
fs.readdirSync(__dirname).forEach(function (file) {
  if (file !== 'index.js') {
    let moduleName = file.split('.')[0]
    exports[moduleName[0].toUpperCase() + moduleName.slice(1)] = require('./' + moduleName)
  }
})
