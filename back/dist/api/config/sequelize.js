"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alumno_1 = require("./../models/alumno");
const curso_1 = require("./../models/curso");
const matricula_1 = require("./../models/matricula");
const notas_1 = require("./../models/notas");
const semestre_1 = require("./../models/semestre");
const Sequelize = require("sequelize");
exports.sequelize = new Sequelize("xN27P3h8XM", "xN27P3h8XM", "3OJolLXRRw", {
    host: "remotemysql.com",
    dialect: "mysql",
    timezone: '-05:00',
    logging: console.log
});
exports.Alumno = alumno_1.alumno_model(exports.sequelize, Sequelize);
exports.Curso = curso_1.curso_model(exports.sequelize, Sequelize);
exports.Notas = notas_1.notas_model(exports.sequelize, Sequelize);
exports.Semestre = semestre_1.semestre_model(exports.sequelize, Sequelize);
exports.Matricula = matricula_1.matricula_model(exports.sequelize, Sequelize);
//En el modelo PlayaServicio va a crear un campo de nombre 'playa_id'
//este campo será la clave foranea que una PlayaServicio con Playa
exports.Matricula.belongsTo(exports.Alumno, { foreignKey: 'alumno_id' });
exports.Matricula.belongsTo(exports.Curso, { foreignKey: 'curso_id' });
exports.Matricula.belongsTo(exports.Notas, { foreignKey: 'notas_id' });
exports.Matricula.belongsTo(exports.Semestre, { foreignKey: 'semestre_id' });
