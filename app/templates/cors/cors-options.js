module.exports = function (defaultConfiguration = true) {

    if (defaultConfiguration) {
        return {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        };
    }

    return {
        origin: ['http://example.com', 'www.google.com'],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'HEAD'],
        allowedHeaders: ['Origin', 'Cache-Control', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

        /* Remaining Options
        exposedHeaders: ['Content-Range', 'X-Content-Range'],
        credentials: true,
        maxAge: 12,
        preflightContinue: true, 
        */
    };
};
