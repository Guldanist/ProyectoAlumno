// PLAYA CONTROLLER
import { Request, Response } from 'express';
import { Alumno } from './../config/sequelize';
import { Notas } from './../config/sequelize';
import { Matricula} from './../config/sequelize';
let sequelize = require('sequelize');
export var alumno_controller = {
    /**
     * Función para obtener todos los espacios o slots
     * Dado el id de la playa, es decir, la 'playa_id'
     */
    getAllAlumnosById:(req:Request,res:Response)=>{
        const {alumno_id} = req.params;

        Alumno.findAll({
            where:{
                alumno_id:alumno_id
            }
        }).then((respuesta:any)=>{
            let response = {
                message:'ok',
                content:respuesta,
            };
            console.log("Error");
            
            res.status(200).json(response);
        })
    },
    getAllAlumnos:(req:Request,res:Response)=>{
        Alumno.findAll().then((respuesta:any)=>{
            let response = {
                message:"ok",
                content:respuesta
            }
            res.status(200).json(response);
        });
    },

    CountAlumnos:(req:Request,res:Response)=>{
        Alumno.findAll({
            attributes: [
                [sequelize.fn(
                                'COUNT', sequelize.col('alumno_id')
                             ), 'alumno_id'
                ]
            ],
            
        }).then((respuesta:any)=>{
            let response = {
                message:"ok",
                content:respuesta
            }
            res.status(200).json(response);
        });
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