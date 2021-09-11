const nodeApp = 'app/';

const Enums = {
  angular: 'Angular',
  mongoose: 'Mongoose',
  none: 'None',
  react: 'React',
  sequelize: 'Sequelize',
  vue: 'Vue',
};

 const DefaultPackageJsonScripts = {
  "preinstall": "npm i -g concurrently nodemon",
  "server-start": "nodemon ./app/server.js | bunyan --output short --color",
  "start": "nodemon ./app/server.js | bunyan"
}

 const Paths = {
  appConfig: `${nodeApp}config/`,
  appControllers: `${nodeApp}controllers/`,
  appLib: `${nodeApp}lib/`,
  appMiddlewares: `${nodeApp}middlewares/`,
  appModels: `${nodeApp}models/`,
  mongoose: 'mongoose',
  nodeApp,
  sequelize: 'sequelize'
 };

module.exports = {
  Enums,
  DefaultPackageJsonScripts,
  Paths,
 }
