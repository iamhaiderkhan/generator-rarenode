const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(err => {

      if (err.errors) {
       <% if (db == 'mongoose') { %> _.forEach(err.errors, (error, key) => {
         errors.push(error.message)
       })
          err = errors[0]
            <% } %>

        <% if (db == 'sequelize') { %> err = err.errors[0].message <% } %>
      } else if (err.message) {
        err = err.message
      } else if (err.msg) {
        err = err.msg
      }

      res.http400(err)
    })
}

module.exports = asyncMiddleware
