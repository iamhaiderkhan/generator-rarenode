const {
    commonFunctions,
    log,
    appErrors,
} = global;

const { Users } = global.db;

module.exports = function () {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) return res.http401(appErrors.authorizationHeaderMissing);

        try {
            const token = authorization.split(' ')[1];
            const decodedToken = await commonFunctions.decodeAPiToken(token);

            if (!decodedToken) return res.http401(appErrors.invalidToken);

            <% if (db === Enums.sequelize) { %>
                const user = await Users.findOne({
                    id: decodedToken.id,
                    deletedAt: null,
                });
            <% } else if (db === Enums.mongoose) { %>
                const user = await Users.findOne({
                    _id: decodedToken._id,
                    deleted: false,
                });
            <% } else { } %>
            
            if (!user) return res.http401(appErrors.invalidToken);
            req.user = user;
            next();
        } catch (error) {
            log.error(error);
            return res.http401(appErrors.invalidToken);
        }
    };
};
