"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curso_model = (sequelize, type) => {
    var curso_model = sequelize.define('t_curso', {
        curso_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        curso_nom: {
            type: type.STRING(50),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 't_curso'
    });
    // Aquí se declaran las funciones de Modelo(o de clase)
    return curso_model;
};
