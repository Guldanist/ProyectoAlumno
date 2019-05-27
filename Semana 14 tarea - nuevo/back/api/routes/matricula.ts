import {matricula_controller} from './../controllers/matricula';
import {Router} from 'express';
// import {wachiman} from './../utils/utils';
export var matricula_router = Router();

matricula_router.get('/matalumnot',matricula_controller.MatriAlumWithNote);