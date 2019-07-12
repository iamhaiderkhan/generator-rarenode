module.exports = {
  http200: function (data) {
    let message = data.message
    delete data.message
    return this.json({
      status: {
        code: 200,
        message: message || 'success'
      },
      body: data
    })
  },

  http400: function (err) {
    console.log('\x1b[31m', '\n\n', JSON.stringify(err, null, 12) == {} || err, '\n\n')

    return this.status(400).send({
      status: {
        code: 400,
        message: err
      }
    })
  },

  http401: function (err) {
    console.log('\x1b[31m', '\n\n', JSON.stringify(err, null, 12) == {} || err, '\n\n')

    return this.status(401).send({
      status: {
        code: 401,
        message: err
      }
    })
  }

}
