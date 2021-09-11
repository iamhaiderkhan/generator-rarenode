'use strict';

const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');

const UsersModel = function () {
    const usersSchema = mongoose.Schema({
        email: String,
    }, {
        collection: 'Users',
    });

    usersSchema.statics.getUser = function (userId) {
        return this.findOne({ _id: userId }).then(function (user) {
            return user;
        });
    };
    usersSchema.plugin(mongoose_delete);
    return mongoose.model('Users', usersSchema);
};

module.exports = new UsersModel();
