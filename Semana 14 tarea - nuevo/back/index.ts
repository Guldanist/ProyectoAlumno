// importando las rutas
import { alumno_router } from './api/routes/alumno';
import { matricula_router } from './api/routes/matricula';

import { sequelize } from './api/config/sequelize';
import { NextFunction, Request, Response } from 'express';
import Server from './classes/server';

var express = require('express');
var bodyParser = require('body-parser');

let servidor = new Server();

var app = express();

// configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PUERTO = process.env.PORT || 3000;
// CONFIGURANDO EL CORS
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods','GET, POST');
    res.header('Allow','GET, POST');
    next();
});

// usando las rutas importadas
app.use('/api', alumno_router);
app.use('/api', matricula_router);


app.listen(PUERTO, function () {
    console.log("Servidor corriendo correctamente en el puerto 3000");
    
    sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos creada con éxito");
    }).catch((error:any) => {
        console.log(error);
        console.log("Error al crear la base de datos");
    })
});
servidor.start();