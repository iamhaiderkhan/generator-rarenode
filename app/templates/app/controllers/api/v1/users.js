'use strict';

const {
    asyncMiddleware,
    commonFunctions,
} = global;

const { Users } = global.db;

module.exports = function (router) {

    router.get('/', asyncMiddleware(async (req, res) => {
    <% if (db === Enums.sequelize) { %>

            let user = await Users.findOne({ where: { email: 'this.haiderkhan@gmail.com' } });

            if (!user) {
                user = await Users.create({
                    email: 'this.haiderkhan@gmail.com',
                    firstName: 'Haider',
                    lastName: 'Khan'
                });
            }

            const token = commonFunctions.createToken({
                id: user.id,
                email: user.email,
            });

            <% if (isCustomizeResponseMiddlewareEnable) { %>
                res.http200({
                    user: user,
                    token: token,
                });
            <% } else { %>
                res.status(200).json({
                    user: user,
                    token: token,
                });
            <% }  %>

    <% } else if (db === Enums.mongoose) { %>

            let user = await Users.findOne({ email: 'this.haiderkhan@gmail.com' });

            if (!user) {
                user = await Users.create({
                    email: 'this.haiderkhan@gmail.com',
                    firstName: 'Haider',
                    lastName: 'Khan'
                });
            }

            const token = commonFunctions.createToken({
                _id: user._id,
                email: user.email
            });

            <% if (isCustomizeResponseMiddlewareEnable) { %>
                res.http200({
                    user: user,
                    token: token,
                });
            <% } else { %>
                res.status(200).json({
                    user: user,
                    token: token,
                });
            <% }  %>
    <% }  %>
  }));

};
