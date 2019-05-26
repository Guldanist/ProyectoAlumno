import {alumno_controller} from './../controllers/alumno';
import {Router} from 'express';
// import {wachiman} from './../utils/utils';
export var alumno_router = Router();

alumno_router.get('/alumno/:alumno_id/',alumno_controller.getAllAlumnosById);
alumno_router.get('/alumno',alumno_controller.getAllAlumnos);