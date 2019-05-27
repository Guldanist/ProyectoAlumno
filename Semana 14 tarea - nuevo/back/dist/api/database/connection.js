"use strict";
const Sequelize = require("sequelize");
const sequelize = new Sequelize("xN27P3h8XM", "xN27P3h8XM", "3OJolLXRRw", {
    host: "remotemysql.com",
    dialect: "mysql",
    operatorAliases: false
});
module.exports = sequelize;
global.sequelize = sequelize;
