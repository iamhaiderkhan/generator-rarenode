const Generators = require('yeoman-generator');

const {
    Enums,
    DefaultPackageJsonScripts,
    Paths,
} = require('./presets');

class GeneratorsBase extends Generators {
    getAnswers() {
        return {
            db: this.answers.db,
            description: this.answers.description,
            frontend: this.answers.frontend,
            isCorsEnable: this.answers.isCorsEnable,
            isCustomizeResponseMiddlewareEnable: this.answers.isCustomizeResponseMiddlewareEnable,
            appname: this.answers.appname,
            isSocketIoEnable: this.answers.isSocketIoEnable,
            Enums,
            Paths,
        };
    }

    executeFs(fsPaths = []) {
        fsPaths.forEach(path =>
            this.fs[path.ejsCompilationNotRequired ? 'copy' : 'copyTpl'](
                this.templatePath(path.templatePath),
                this.destinationPath(path.destinationPath),
                this.getAnswers(),
            )
        );
    }

    extendPackageJson(json = {}) {
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), { ...json });
    }
}

module.exports = class extends GeneratorsBase {

    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'appname',
                message: 'Your Project Name:',
                default: this.appname,
            },
            {
                type: 'input',
                name: 'description',
                message: 'Describe Your App:',
                store: true,
            },
            {
                type: 'list',
                name: 'db',
                message: 'Which ORM Would You Like To Use?',
                choices: [Enums.mongoose, Enums.sequelize],
                store: true,
            },
            {
                type: 'confirm',
                name: 'isCorsEnable',
                message: 'Would You Like To Use Cross-Origin Resource Sharing(CORS)?',
                default: true,
                store: true,
            },
            {
                type: 'confirm',
                name: 'isCustomizeResponseMiddlewareEnable',
                message: 'Would You Like To Use Customize Response Middleware?',
                default: true,
                store: true,
            },
            {
                type: 'confirm',
                name: 'isSocketIoEnable',
                message: 'Would You Like To Enable Socket.io?',
                default: true,
                store: true
            },
            {
                type: 'list',
                name: 'frontend',
                message: 'Which Frontend Framework Would You Like To Use?',
                choices: [Enums.react, Enums.angular, Enums.vue, Enums.none],
                store: true,
            },
        ]);
        this.appname = this.answers.appname || this.appname;
        return this.answers;
    }

    installingDependencies() {
        const fsPaths = [
            {
                templatePath: 'package-json/*',
                destinationPath: '',
            },
        ];
        this.executeFs(fsPaths);

        const dependencies = [
            'bluebird',
            'bunyan',
            'construx-copier',
            'construx',
            'express',
            'kraken-js',
            'lodash',
            'moment',
            "crypto",
            "dotenv",
            "jquery",
            "jsonwebtoken",
            "rxjs",
            "tslib",
            "zone.js",
        ];

        const devDependencies = [
            'concurrently',
            'mocha',
            'nodemon',
            'supertest',
            "codelyzer",
            "eslint",
            "extract-text-webpack-plugin",
        ];

        switch (this.answers.db) {
            case Enums.mongoose: {
                dependencies.push(
                    'mongoose',
                    "mongoose-delete",
                );
                break;
            }
            case Enums.sequelize: {
                dependencies.push(
                    'mysql',
                    'mysql2',
                    'sequelize',
                );
                devDependencies.push('sequelize-cli');
                break;
            }
            default:
                break;
        }

        if (this.answers.isCorsEnable) {
            dependencies.push('cors');
        }

        if (this.answers.isCustomizeResponseMiddlewareEnable) {
            dependencies.push('@rarenode/customize-response');
        }

        if (this.answers.isSocketIoEnable) {
            dependencies.push('socket.io');
        }

        switch (this.answers.frontend) {
            case Enums.react: {
                dependencies.push(
                    'babel-core',
                    'babel-loader',
                    'babel-preset-es2015',
                    'babel-preset-react',
                    'react-dom',
                    'react',
                    "@babel/core",
                    "@babel/preset-env",
                    "@babel/preset-react",
                    "axios",
                    "babel-eslint",
                    "babel",
                    "compression-webpack-plugin",
                    "copy-webpack-plugin",
                    "css-loader",
                    "file-loader",
                    "html-loader",
                    "html-webpack-plugin",
                    "node-sass",
                    "raw-loader",
                    "sass-loader",
                    "style-loader",
                    "webpack-cli",
                    "webpack",
                    "extract-text-webpack-plugin@next",
                );
                break;
            }
            case Enums.angular: {
                dependencies.push(
                    "@angular/animations",
                    "@angular/common",
                    "@angular/compiler",
                    "@angular/core",
                    "@angular/forms",
                    "@angular/platform-browser-dynamic",
                    "@angular/platform-browser",
                    "@angular/router",
                    "tslib",
                );
                devDependencies.push(
                    "@angular-devkit/build-angular",
                    "@angular/cli",
                    "@angular/compiler-cli",
                    "@angular/language-service",
                    "@types/jasmine",
                    "@types/jasminewd2",
                    "@types/node",
                    "jasmine-core",
                    "jasmine-spec-reporter",
                    "karma-chrome-launcher",
                    "karma-coverage-istanbul-reporter",
                    "karma-jasmine-html-reporter",
                    "karma-jasmine",
                    "karma",
                    "protractor",
                    "ts-node",
                    "tslint",
                    "typescript@3.5.2",
                )
                break;
          }
          case Enums.vue: {
            dependencies.push(
              "@babel/core",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-decorators",
              "@babel/plugin-proposal-json-strings",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-syntax-import-meta",
              "@babel/polyfill",
              "@babel/preset-env",
              "babel-loader",
              "compression-webpack-plugin",
              "copy-webpack-plugin",
              "cross-env",
              "css-loader",
              "file-loader",
              "friendly-errors-webpack-plugin",
              "html-loader",
              "html-webpack-plugin",
              "mini-css-extract-plugin",
              "node-sass",
              "optimize-css-assets-webpack-plugin",
              "sass-loader",
              "uglifyjs-webpack-plugin",
              "url-loader",
              "vue",
              "vue-loader",
              "vue-router",
              "vue-style-loader",
              "vue-template-compiler",
              "webpack",
              "webpack-cli",
            );
            break;
        }
            
        }

        this.npmInstall(dependencies, { save: true });
        this.npmInstall(devDependencies, { saveDev: true });
    }

    setupReact() {
        if (this.answers.frontend === Enums.react) {
            const fsPaths = [
                {
                    templatePath: 'react/*',
                    destinationPath: '',
                },
                {
                    templatePath: 'react/.babelrc',
                    destinationPath: '.babelrc',
                },
                {
                    templatePath: 'react/client/*',
                    destinationPath: 'client/',
                },
                {
                    templatePath: 'react/client/styles/*',
                    destinationPath: 'client/styles/',
                },
                {
                    templatePath: 'react/client/assets/*',
                    destinationPath: 'client/assets/',
                },
            ];
            this.executeFs(fsPaths);
        }
    }

    setupAngular() {
        if (this.answers.frontend === Enums.angular) {
            const fsPaths = [
                {
                    templatePath: 'angular/*',
                    destinationPath: '',
                },
                {
                    templatePath: 'angular/client',
                    destinationPath: 'client/',
                    ejsCompilationNotRequired: true
                },
            ];
            this.executeFs(fsPaths);
        }
    }
  
  setupVue() {
    if (this.answers.frontend === Enums.vue) {
      const fsPaths = [
          {
              templatePath: 'vue/*',
              destinationPath: '',
          },
          {
              templatePath: 'vue/.babelrc',
              destinationPath: '.babelrc',
          },
          {
              templatePath: 'vue/client/*',
              destinationPath: 'client/',
          },
          {
              templatePath: 'vue/client/assets/*',
              destinationPath: 'client/assets/',
          },
      ];
      this.executeFs(fsPaths);
  }
  }

    setupNode() {
        const fsPaths = [
            {
                templatePath: `${Paths.nodeApp}*`,
                destinationPath: Paths.nodeApp,
            },
            {
                templatePath: `${Paths.appConfig}*`,
                destinationPath: Paths.appConfig,
            },
            {
                templatePath: `${Paths.appControllers}*`,
                destinationPath: Paths.appControllers,
            },
            {
                templatePath: `${Paths.appControllers}api/v1/*`,
                destinationPath: `${Paths.appControllers}api/v1/`,
            },
            {
                templatePath: `${Paths.appLib}*`,
                destinationPath: Paths.appLib,
            },
            {
                templatePath: `${Paths.appMiddlewares}*`,
                destinationPath: Paths.appMiddlewares,
            },
            {
                templatePath: `${Paths.appMiddlewares}response/*`,
                destinationPath: `${Paths.appMiddlewares}response/`,
            },
        ];
        this.executeFs(fsPaths);
    }

    setupMiddlewares() {
        const fsPaths = [];

        if (this.answers.isCorsEnable) {
            fsPaths.push({
                templatePath: 'cors/*',
                destinationPath: Paths.appConfig,
            });
        }

        if (this.answers.isCustomizeResponseMiddlewareEnable) {
            fsPaths.push({
                templatePath: 'rare-customize-response/*',
                destinationPath: Paths.appConfig,
            });
        }

        this.executeFs(fsPaths);
    }

    createPackageJson() {
        let packageJson = {
            scripts: {
                ...DefaultPackageJsonScripts,
            }
        };

        switch (this.answers.frontend) {
            case Enums.react: {
                packageJson.scripts = {
                    ...packageJson.scripts,
                    "build": "webpack -p",
                    "client-start": "webpack -d --watch",
                    "dev-start": "concurrently --kill-others \"npm run server-start\" \"npm run client-start\"",
                };
                break;
            }
            case Enums.angular: {
                packageJson.scripts = {
                    ...packageJson.scripts,
                    "ng": "ng",
                    "build": "ng build",
                    "prod-build": "ng build --prod",
                    "e2e": "ng e2e",
                    "test": "ng test",
                    "lint": "eslint ./app && ng lint",
                    "start": "npm run prod-build && node ./app/server.js | bunyan",
                    "client-start": "ng build --output-hashing=none --watch",
                    "dev-start": "concurrently --kill-others \"npm run server-start\" \"npm run client-start\"",
                };
                break;
            }
            case Enums.vue: {
                packageJson.scripts = {
                    ...packageJson.scripts,
                    "build": "webpack -p",
                    "client-start": "webpack -d --watch",
                    "dev-start": "concurrently --kill-others \"npm run server-start\" \"npm run client-start\"",
                };
                break;
            }
        }

        if (this.answers.db === Enums.sequelize) {
            packageJson.scripts = {
                ...packageJson.scripts,
                "migrate": "sequelize db:migrate | bunyan",
                "seeder": "sequelize db:seed:all | bunyan",
            };
        }

        this.extendPackageJson(packageJson);
    }

    writing() {
        let fsPaths = [
            {
                templatePath: `${this.answers.db.toLowerCase()}/models/*`,
                destinationPath: 'app/models/',
            },
            {
                templatePath: '*',
                destinationPath: '',
            },
            {
                templatePath: '.*',
                destinationPath: '',
            },
        ];

        if (this.answers.db === Enums.sequelize) {
            const date = Math.floor(new Date().getTime() / 1000);
            fsPaths = [
                ...fsPaths,
                {
                    templatePath: `${Paths.sequelize}/migrations/create-users.js`,
                    destinationPath: `${Paths.nodeApp}migrations/${date}-create-users.js`,
                },
                {
                    templatePath: `${Paths.sequelize}/seeders/create-users.js`,
                    destinationPath: `${Paths.nodeApp}seeders/${date}-create-users.js`,
                },
                {
                    templatePath: `${Paths.sequelize}/database.js`,
                    destinationPath: `${Paths.appConfig}database.js`,
                },
                {
                    templatePath: `${Paths.sequelize}/database.js`,
                    destinationPath: `${Paths.appConfig}database-config.js`,
                },
                {
                    templatePath: `${Paths.sequelize}/.sequelizerc`,
                    destinationPath: '.sequelizerc',
                }
            ];
        }
        else if (this.answers.db === Enums.mongoose) {
            fsPaths.push({
                templatePath: `${Paths.mongoose}/database.json`,
                destinationPath: `${Paths.appConfig}database.json`,
            });
        }

        this.executeFs(fsPaths);
    }
}
