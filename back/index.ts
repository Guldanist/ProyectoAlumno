// importando las rutas
// import { servicio_router } from './api/routes/servicio';
import { auth_router } from './api/routes/auth';
import { alumno_router } from './api/routes/alumno';
// import { registro_router } from './api/routes/registro';

import { sequelize } from './api/config/sequelize';
import { NextFunction, Request, Response } from 'express';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PUERTO = process.env.PORT || 3001;
// CONFIGURANDO EL CORS
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods','GET, POST');
    res.header('Allow','GET, POST');
    next();
});

// usando las rutas importadas
// app.use('/api', servicio_router);
app.use('/api', alumno_router);
// app.use('/api', registro_router);
app.use('/api', auth_router);


app.listen(PUERTO, function () {
    console.log(`Servidor corriendo correctamente en el puerto  ${PUERTO}`);
    
    sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos creada con éxito");
        console.log(`Servidor corriendo correctamente en el puerto  ${PUERTO}`);
        
    }).catch((error:any) => {
        console.log(error);
        console.log("Error al crear la base de datos");
    })
});