const nodeApp = 'app/';

export const ENUMS = {
  ANGULAR: 'Angular',
  MONGOOSE: 'Mongoose',
  NONE: 'None',
  REACT: 'React',
  SEQUELIZE: 'Sequelize',
};

export const DefaultPackageJsonScripts = {
  "preinstall": "npm i -g concurrently nodemon",
  "server-start": "nodemon ./app/server.js | bunyan --output short --color",
  "start": "nodemon ./app/server.js | bunyan"
}

export const Paths = {
  appConfig: `${nodeApp}config/`,
  appControllers: `${nodeApp}controllers/`,
  appLib: `${nodeApp}lib/`,
  appMiddlewares: `${nodeApp}middlewares/`,
  appModels: `${nodeApp}models/`,
  mongoose: 'mongoose',
  nodeApp,
  sequelize: 'sequelize'
};
