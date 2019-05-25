import { Sequelize } from 'sequelize';

export var alumno_model = (sequelize: Sequelize, type: any) => {
    var alumno_model = sequelize.define('t_alumno',
        {
            alumno_id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            alumno_nom: {
                type: type.STRING(50),
                allowNull: false
            },
            alumno_ape: {
                type: type.STRING(50),
                allowNull: false
            },
            alumno_email: {
                type: type.STRING(20),
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 't_alumno'
        });
    return alumno_model;

}