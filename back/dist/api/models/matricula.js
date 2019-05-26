"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matricula_model = (sequelize, type) => {
    var matricula_model = sequelize.define('t_matricula', {
        matricula_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 't_matricula'
    });
    return matricula_model;
};
