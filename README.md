# generator-rarenode

## Rarenode

Yeoman generator for MEAN / MERN / MEVN Application with Express / NodeJS / KrakensJs, Mongoose or Sequelize, Sockets.io (Optional), Angular or ReactJS or VueJS. (Optional).

Yeoman generator for:

- Express with KrakenJS
- Mongoose or Sequelize
- Sockets.io (Optional)
- Angular or ReactJS or VUEJS
- Webpack4 and Babel7

# Installation

As this is a yeoman generator, make sure you have yeoman installed:

`npm install -g yo`

To install the generator:

`npm install -g generator-rarenode`

# Usage

`cd /path/to/app/directory; yo rarenode`

# Files & App Structure

    .
    +-- app/
    |   +-- controllers/
    |   +-- lib/
    |   +-- models/
    +-- config/
    |   +-- config.json
    |   +-- development.json
    |   +-- production.json
    +-- .gitignore
    +-- .npmignore
    +-- .editorconfig
    +-- .eslintrc
    +-- package.json
    +-- README.md
    +-- server.js
    +-- index.js

This generator is somewhat opinionated. You might be interested in knowing the following things about the way it sets the app.

## Sequelize & Mongoose

- It loads all the models on the variable `global.db`
- While loading models, it converts snake cased file names found under `app/models` into camel case model name. For example, a file named `user_chats` will be available as `global.db.UserChats`

- If you choose sequelize

    - update your mysql username & password in config/database.js

## Auth
 - Authentication is implemented by defualt.
 - If you want modification in rules just update the keys in `config/config.json` in `authentication` object. For example by defualt all users routes will be bypass with this regex.  `authentication.route:"\/api\/v1((?!$))((?!\/root\/))((?!\/users))*"`.
 - If you want bypass some specific routes, For example  `users/login`, `users/sign-up`. just update the rules regex in `authentication.route:"\/api\/v1((?!$))((?!\/root\/))((?!\/users\/login))((?!\/users\/sign-up))*"`.


## Typescript Support

- Coming Soon.

## Redux & Epics

- Coming Soon.

## Commands

- npm install
- npm run build
- npm client-start
- npm dev-start
- npm run migrate
