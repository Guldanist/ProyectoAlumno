import { Request, Response } from 'express';
import { Alumno } from './../config/sequelize';
import { Notas } from './../config/sequelize';
let sequelize = require('sequelize');
export var alumno_controller = {

    getAllAlumnosById: (req: Request, res: Response) => {
        const { alumno_id } = req.params;
        Alumno.findAll({
            where: {
                alumno_id: alumno_id
            }
        }).then((respuesta: any) => {
            let response = {
                message: 'ok',
                content: respuesta,
            };
            console.log("Error");

            res.status(200).json(response);
        })
    },
    getAllAlumnos: (req: Request, res: Response) => {
        Alumno.findAll().then((respuesta: any) => {
            let response = {
                message: "ok",
                content: respuesta
            }
            res.status(200).json(response);
        });
    },

    CountAlumnos: (req: Request, res: Response) => {
        Alumno.findAll({
            attributes: [
                [sequelize.fn(
                    'COUNT', sequelize.col('alumno_id')
                ), 'alumno_id'
                ]
            ],

        }).then((respuesta: any) => {
            let response = {
                message: "ok",
                content: respuesta
            }
            res.status(200).json(response);
        });
    },

    register: (req: Request, res: Response) => {
        Alumno.findAll({
            where: {
                alumno_nom: req.body.alumno_nom,
                alumno_ape: req.body.alumno_ape,
                alumno_email: req.body.alumno_email
            }
        }).then((usuarios: any) => {
            if (usuarios.length === 0) {
                let objUsuario = Alumno.build(req.body);
                objUsuario.save().then((usuarioCreado: any) => {
                    if (usuarioCreado) {
                        let response = {
                            message: 'created',
                        };
                        res.status(201).json(response);
                    } else {
                        let response = {
                            message: 'error',
                            content: 'Erro al crear el usuario',
                        };
                        res.status(500).json(response);
                    }
                });
            } else {
                let response = {
                    message: 'error',
                    content: `El usuario con email ${req.body.alumno_email} ya existe`,
                };
                res.status(500).json(response);
            }
        })
    },

    AlumnosWithNote:(req:Request,res:Response)=>{
        Alumno.findAll({
            include: [
                {model: Notas, as: 'C', required: true,},
                {model: Matricula, as: 'B', required: true,}, 
            ],
            attributes: [
                ['A.alumno_id', 'A.alumno_id'],
                ['A.alumno_nom', 'A.alumno_nom'],
                ['A.alumno_ape', 'A.alumno_ape'],
                ['C.nota1', 'C.nota1']],
            }).then((respuesta:any)=>{
            let response = {
                message:"ok",
                content:respuesta
            }
            res.status(200).json(response);
        });
}
}