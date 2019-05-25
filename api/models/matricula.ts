import { Sequelize } from 'sequelize';

export var matricula_model = (sequelize: Sequelize, type: any) => {
    var matricula_model = sequelize.define('t_matricula',
        {
            matricula_id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            }
        },
        {
            timestamps: false,
            tableName: 't_matricula'
        });

    return matricula_model;

}