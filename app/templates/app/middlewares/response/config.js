module.exports = {
    errors: (err, key) => {
        const errors = err[key];
        if (Array.isArray(errors) && errors.length) {
            return errors[0].message || errors[0];
        }
    },
    'msg, message': (err, key) => err[key],
};
