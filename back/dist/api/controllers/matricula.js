"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const sequelize_2 = require("./../config/sequelize");
const sequelize_3 = require("./../config/sequelize");
let sequelize = require('sequelize');
exports.matricula_controller = {
    /**
     * Función para obtener todos los espacios o slots
     * Dado el id de la playa, es decir, la 'playa_id'
     */
    MatriAlumWithNote: (req, res) => {
        sequelize_3.Matricula.findAll({
            include: [
                { model: sequelize_2.Notas, as: 'C', required: true, },
                { model: sequelize_1.Alumno, as: 'B', required: true, },
            ],
        }).then((respuesta) => {
            let response = {
                message: "ok",
                content: respuesta
            };
            res.status(200).json(response);
        });
    }
};
