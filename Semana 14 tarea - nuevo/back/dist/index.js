"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importando las rutas
const alumno_1 = require("./api/routes/alumno");
const matricula_1 = require("./api/routes/matricula");
const sequelize_1 = require("./api/config/sequelize");
const server_1 = __importDefault(require("./classes/server"));
var express = require('express');
var bodyParser = require('body-parser');
let servidor = new server_1.default();
var app = express();
// configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PUERTO = process.env.PORT || 3000;
// CONFIGURANDO EL CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Allow', 'GET, POST');
    next();
});
// usando las rutas importadas
app.use('/api', alumno_1.alumno_router);
app.use('/api', matricula_1.matricula_router);
app.listen(PUERTO, function () {
    console.log("Servidor corriendo correctamente en el puerto 3000");
    sequelize_1.sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos creada con éxito");
    }).catch((error) => {
        console.log(error);
        console.log("Error al crear la base de datos");
    });
});
servidor.start();
