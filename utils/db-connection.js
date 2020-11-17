const { Sequelize } = require('sequelize');
var Live = require("../environments/env.live");
var Test = require("../environments/env.test");

let settings = (function sequelize() {
    let Settings;
    if (process.env.NODE_ENV === 'development') {
        console.log('you are in the dev environment.');
        Settings = Test;
    } else {
        console.log('you are in the live environment.');
        Settings = Live;
    }

    return Settings;
})();

var sequelize = new Sequelize(settings.DB, settings.UN, settings.PW, {
    host: settings.HOST,
    dialect: settings.DIALECT
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
