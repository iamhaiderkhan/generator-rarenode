
const { db,asyncMiddleware, commonFunctions } = global

module.exports = function (router) {

  router.get('/', asyncMiddleware(async(req, res, next) => {
    <% if (db === 'sequelize') { %>



      let user = await db.Users.findOne({ where: { email: 'this.haiderkhan@gmail.com' } });
      if (!user) {



        user = await db.Users.create({
          email: 'this.haiderkhan@gmail.com',
          firstName: 'Muhammad Haider',
          lastName: 'Khan'
        })
      }
      let token = commonFunctions.createToken({
            id: user.id,
            email: user.email,
            model: 'Users'
          });

      res.http200({
        user: user,
        token:token
      })


    <% } else if (db === 'mongoose') { %>

      // I know, this API should return a list but what the hell
      let user = await db.Users.findOne({ email: 'this.haiderkhan@gmail.com'  });
      if (!user) {

          user = await db.Users.create({
            email: 'this.haiderkhan@gmail.com',
            firstName: 'Muhammad Haider',
            lastName: 'Khan'
          })


      }

      let token = commonFunctions.createToken({
        _id: user._id,
        email: user.email,
        model: 'Users'
      });

      res.http200({
        user: user,
        token:token
      })
    <% } else {} %>
  }));

};





