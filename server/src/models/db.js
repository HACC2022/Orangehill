const Sequelize = require("sequelize")
const config = require("../config/config")

// access database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.DBPATH
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.URL = require("./url.model.js")(sequelize, Sequelize)

// provide the db as an export
module.exports = db