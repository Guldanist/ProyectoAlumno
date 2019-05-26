// AUTH CONTROLLER
import { Request, Response } from 'express';
import { Alumno } from './../config/sequelize';
export var auth_controller = {
    /**
     * Función para registrar un usuario
     * se reciben los parametros por el BODY método POST
     */
    register: (req: Request, res: Response) => {

        Alumno.findAll({
            where: {
                alumno_nom: req.body.alumno_nom,
                alumno_ape: req.body.alumno_ape,
                alumno_email: req.body.alumno_email
            }
        }).then((usuarios: any) => {
            if (usuarios.length === 0) {
                // -- AQUI -- //
                // Instanciando un objeto del modelo Usuario
                let objUsuario = Alumno.build(req.body);
                objUsuario.save().then((usuarioCreado: any) => {
                    // let token = usuarioCreado.generateJWT();
                    if (usuarioCreado) {
                        let response = {
                            message: 'created',
                            // token: token,
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
                // </aqui>
            } else {
                let response = {
                    message: 'error',
                    content: `El usuario con email ${req.body.alumno_email} ya existe`,
                };
                res.status(500).json(response);
            }
        })


    },
    // login: (req: Request, res: Response) => {
    //     let {usu_email,usu_pass} = req.body;
    //     // findOne => 
    //     Alumno.findOne({
    //         where:{
    //             usu_email:usu_email
    //         }
    //     }).then((objUsuario:any)=>{
    //         if(objUsuario){
    //             // el usuario existe => validar la contra
    //             let valid = objUsuario.validPassword(usu_pass);
    //             if(valid){
    //                 // contrasenia correcta
    //                 let token = objUsuario.generateJWT();
    //                 let response = {
    //                     message:'ok',
    //                     token:token
    //                 };
    //                 res.status(200).json(response);
    //             }else{
    //                 // contrasenia incorrecta
    //                 let response = {
    //                     message: 'error',
    //                     content: 'Usuario o password incorrecto'
    //                 };
    //                 res.status(500).json(response);
    //             }
    //         }else{
    //             // si es null
    //             let response = {
    //                 message: 'error',
    //                 content: 'Usuario o password incorrecto'
    //             };
    //             res.status(500).json(response);
    //         }
    //     })
    // }   
}