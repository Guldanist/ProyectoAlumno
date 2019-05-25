// pendiente, cambiar tipos any
import {Sequelize} from 'sequelize';

export var curso_model = (sequelize:Sequelize,type:any)=>{
    var curso_model = sequelize.define('t_curso',
    {
        curso_id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false,
        },
        curso_nom:{
            type: type.STRING(50),
            allowNull: false
        }
    },
    {
        timestamps:false,
        tableName:'t_curso'
    });

    // Aquí se declaran las funciones de Modelo(o de clase)

    return curso_model;

}