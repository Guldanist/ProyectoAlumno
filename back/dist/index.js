"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importando las rutas
// import { servicio_router } from './api/routes/servicio';
const auth_1 = require("./api/routes/auth");
const alumno_1 = require("./api/routes/alumno");
// import { registro_router } from './api/routes/registro';
const sequelize_1 = require("./api/config/sequelize");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PUERTO = process.env.PORT || 3001;
// CONFIGURANDO EL CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Allow', 'GET, POST');
    next();
});
// usando las rutas importadas
// app.use('/api', servicio_router);
app.use('/api', alumno_1.alumno_router);
// app.use('/api', registro_router);
app.use('/api', auth_1.auth_router);
app.listen(PUERTO, function () {
    console.log(`Servidor corriendo correctamente en el puerto  ${PUERTO}`);
    sequelize_1.sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos creada con éxito");
        console.log(`Servidor corriendo correctamente en el puerto  ${PUERTO}`);
    }).catch((error) => {
        console.log(error);
        console.log("Error al crear la base de datos");
    });
});
