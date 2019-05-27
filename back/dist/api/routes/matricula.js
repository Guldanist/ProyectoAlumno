"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matricula_1 = require("./../controllers/matricula");
const express_1 = require("express");
// import {wachiman} from './../utils/utils';
exports.matricula_router = express_1.Router();
exports.matricula_router.get('/matalumnot', matricula_1.matricula_controller.MatriAlumWithNote);
