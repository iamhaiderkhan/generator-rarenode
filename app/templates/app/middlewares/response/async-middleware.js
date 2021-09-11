const config = require('./config');
const possibleErrorKeys = [
    'msg',
    'message',
    'errors',
];

module.exports = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
        let err;
        Object.keys(config).every(key => {
            let existingKey = error[key] && key;
            if (!existingKey) {
                key.split(',').some(subKey => {
                    if (error[subKey.trim()]) {
                        return existingKey = subKey.trim();
                    }
                });
            }
            if (existingKey) {
                err = config[key](error, existingKey);
                return false;
            }
            err = error;
            return true;
        });

        res.http500(err);
    });
};
