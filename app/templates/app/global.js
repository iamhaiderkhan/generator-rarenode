const fs = require('fs');
const path = require('path');

// Global Path Variables
global.appRoot = __dirname;
global.paths = {};

defineNodeFoldersPathsOnGlobalObject();
defineConstansOnGlobalObject(require(`${global.paths.config}/config.json`).app);

// Global Functions
global.log = require(`${global.paths.lib}/logger`);
global.asyncMiddleware = require(`${global.paths.middlewares}/response/async-middleware`);

// Global Objects
global.db = require(`${global.paths.models}/index`);
global.commonFunctions = require(`${global.paths.lib}/common`);
global._ = require('lodash');
global.moment = require('moment');


function defineNodeFoldersPathsOnGlobalObject() {
    fs.readdirSync(
        path.resolve(`${__dirname.split('\\').pop()}`)
    ).filter(str => !str.includes('.')).forEach(dir => global.paths[dir] = `${global.appRoot}/${dir}`);
}

function defineConstansOnGlobalObject(constants) {
    Object.keys(constants).forEach(key => {
        const KEY = `app${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        if (typeof constants[key] === 'string' && ~constants[key].indexOf('import')) {
            global[KEY] = require(`./config/${constants[key].split('import:./')[1]}`);
            return;
        }
        global[KEY] = constants[key];
    });
}

module.exports = {
    defineConstansOnGlobalObject,
};
