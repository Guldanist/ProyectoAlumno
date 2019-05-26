"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notas_model = (sequelize, type) => {
    var notas_model = sequelize.define('t_notas', {
        notas_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nota1: {
            type: type.INTEGER,
            allowNull: false
        },
        nota2: {
            type: type.INTEGER,
            allowNull: false
        },
        nota3: {
            type: type.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 't_notas'
    });
    return notas_model;
};
