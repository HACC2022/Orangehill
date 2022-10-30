const db = require('./db.js')

const URL = function (url) {
    this.url = url.url
    this.expire = url.expire
    this.times = url.times
    this.short = url.short
}

module.exports = (sequelize, Sequelize) => {
    const URL = sequelize.define("URL", {
        url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expire: {
            type: Sequelize.DATE
        },
        times: {
            type: Sequelize.INTEGER
        },
        short: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

        }
    });

    return URL;
};