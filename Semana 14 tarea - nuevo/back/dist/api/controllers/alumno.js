"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const sequelize_2 = require("./../config/sequelize");
let sequelize = require('sequelize');
exports.alumno_controller = {
    getAllAlumnosById: (req, res) => {
        const { alumno_id } = req.params;
        sequelize_1.Alumno.findAll({
            where: {
                alumno_id: alumno_id
            }
        }).then((respuesta) => {
            let response = {
                message: 'ok',
                content: respuesta,
            };
            console.log("Error");
            res.status(200).json(response);
        });
    },
    getAllAlumnos: (req, res) => {
        sequelize_1.Alumno.findAll().then((respuesta) => {
            let response = {
                message: "ok",
                content: respuesta
            };
            res.status(200).json(response);
        });
    },
    CountAlumnos: (req, res) => {
        sequelize_1.Alumno.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('alumno_id')), 'alumno_id'
                ]
            ],
        }).then((respuesta) => {
            let response = {
                message: "ok",
                content: respuesta
            };
            res.status(200).json(response);
        });
    },
    register: (req, res) => {
        sequelize_1.Alumno.findAll({
            where: {
                alumno_nom: req.body.alumno_nom,
                alumno_ape: req.body.alumno_ape,
                alumno_email: req.body.alumno_email
            }
        }).then((usuarios) => {
            if (usuarios.length === 0) {
                let objUsuario = sequelize_1.Alumno.build(req.body);
                objUsuario.save().then((usuarioCreado) => {
                    if (usuarioCreado) {
                        let response = {
                            message: 'created',
                        };
                        res.status(201).json(response);
                    }
                    else {
                        let response = {
                            message: 'error',
                            content: 'Erro al crear el usuario',
                        };
                        res.status(500).json(response);
                    }
                });
            }
            else {
                let response = {
                    message: 'error',
                    content: `El usuario con email ${req.body.alumno_email} ya existe`,
                };
                res.status(500).json(response);
            }
        });
    },
    AlumnosWithNote: (req, res) => {
        sequelize_1.Alumno.findAll({
            include: [
                { model: sequelize_2.Notas, as: 'C', required: true, },
                { model: Matricula, as: 'B', required: true, },
            ],
            attributes: [
                ['A.alumno_id', 'A.alumno_id'],
                ['A.alumno_nom', 'A.alumno_nom'],
                ['A.alumno_ape', 'A.alumno_ape'],
                ['C.nota1', 'C.nota1']
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
