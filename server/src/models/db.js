const Sequelize = require("sequelize");
const config = require("../config/config")

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.DBPATH
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.URL = require("./url.model.js")(sequelize, Sequelize);

module.exports = db;