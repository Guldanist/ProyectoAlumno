import { Request, Response } from 'express';
import { Alumno } from './../config/sequelize';
import { Notas } from './../config/sequelize';
import { Matricula } from './../config/sequelize';
let sequelize = require('sequelize');
export var matricula_controller = {
    /**
     * Función para obtener todos los espacios o slots
     * Dado el id de la playa, es decir, la 'playa_id'
     */
    MatriAlumWithNote: (req: Request, res: Response) => {
        Matricula.findAll({
            include: [
                { model: Notas, as: 'C', required: true, },
                { model: Alumno, as: 'B', required: true, },
            ],
        }).then((respuesta: any) => {
            let response = {
                message: "ok",
                content: respuesta
            }
            res.status(200).json(response);
        });
    }




}