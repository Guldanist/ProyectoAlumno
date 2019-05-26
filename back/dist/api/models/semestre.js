"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semestre_model = (sequelize, type) => {
    var semestre_model = sequelize.define('t_semestre', {
        semestre_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        semestre_nom: {
            type: type.STRING(50),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 't_semestre'
    });
    return semestre_model;
};
