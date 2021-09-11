'use strict';

const app = require('./index');
const http = require('http');

<% if (db == Enums.mongoose) { %>

    const mongoose = require('mongoose');
    const mongoString = require(`${global.paths.config}/database.json`).url;
    mongoose.Promise = require('bluebird');

    const mongoLogger = function (coll, method, query, doc) {
        global.log.debug(`${coll}.${method}(${JSON.stringify(query)}, ${JSON.stringify(doc)})`);
    };

    mongoose.set('debug', mongoLogger);

    mongoose.connect(mongoString,{ useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
        if (error) {
            global.log.error(error);
        } else {
            global.log.info('Connected to MongoDB');
        }
    });

<% } %>

const server = http.Server(app);
<% if (isSocketIoEnable) { %>
global.io = require('socket.io').listen(server);
global.io.on('connection', () => {
    global.log.info('Connected to Socket IO');
});
<% } %>
server.listen(process.env.PORT);

server.on('listening', function () {
    global.log.info(`Server listening on http://localhost:${this.address().port}`);
});
