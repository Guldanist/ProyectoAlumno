import { alumno_model } from './../models/alumno';
import { curso_model } from './../models/curso';
import { matricula_model } from './../models/matricula';

import { notas_model } from './../models/notas';
import { semestre_model } from './../models/semestre';

const Sequelize = require("sequelize");

export const sequelize = new Sequelize("xN27P3h8XM", "xN27P3h8XM", "3OJolLXRRw",
    {
        host: "remotemysql.com",
        dialect: "mysql",
        timezone: '-05:00',
        logging: console.log
    });

export const Alumno = alumno_model(sequelize, Sequelize);
export const Curso = curso_model(sequelize, Sequelize);
export const Notas = notas_model(sequelize, Sequelize);

export const Semestre = semestre_model(sequelize, Sequelize);
export const Matricula = matricula_model(sequelize, Sequelize);

//En el modelo PlayaServicio va a crear un campo de nombre 'playa_id'
//este campo será la clave foranea que una PlayaServicio con Playa
Matricula.belongsTo(Alumno, { foreignKey: 'alumno_id' });
Matricula.belongsTo(Curso, { foreignKey: 'curso_id' });
Matricula.belongsTo(Notas, { foreignKey: 'notas_id' });
Matricula.belongsTo(Semestre, { foreignKey: 'semestre_id' });