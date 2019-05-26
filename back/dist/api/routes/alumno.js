"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alumno_1 = require("./../controllers/alumno");
const express_1 = require("express");
// import {wachiman} from './../utils/utils';
exports.alumno_router = express_1.Router();
exports.alumno_router.get('/alumno/:alumno_id/', alumno_1.alumno_controller.getAllAlumnosById);
exports.alumno_router.get('/alumno', alumno_1.alumno_controller.getAllAlumnos);
