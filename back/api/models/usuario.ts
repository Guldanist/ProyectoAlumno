// pendiente, cambiar tipos any
import { Sequelize } from 'sequelize';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

export var usuario_model = (sequelize: Sequelize, type: any) => {
    var usuario_model = sequelize.define('t_usuario',
        {
            usu_id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            usu_email: {
                type: type.STRING(50),
            },
            usu_hash: {
                type: type.TEXT,
            },
            usu_salt: {
                type: type.TEXT,
            },
            usu_rol: {
                type: type.STRING(1),
            },
            usu_nom: {
                type: type.STRING(100),
            },
            usu_ape: {
                type: type.STRING(100),
            },
            usu_tel: {
                type: type.STRING(50)
            }
        },
        {
            timestamps: false,
            tableName: 't_usuario'
        });

    // Aquí se declaran las funciones de Modelo(o de clase)

    usuario_model.prototype.setSaltAndHash = function (password: any) {
        this.usu_salt = crypto.randomBytes(16).toString('hex');
        this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    };

    usuario_model.prototype.validPassword = function(password:any){
        let hash_temporal = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
        if(hash_temporal === this.usu_hash){
            return true;
        }else{
            return false;
        }
    };

    usuario_model.prototype.generateJWT = function(){
        let payload = {
            usu_id: this.usu_id,
            usu_nom: `${this.usu_nom} ${this.usu_ape}`
        };
        
        var token = jwt.sign(payload,'sape',{ expiresIn: '1h'},{algorithm: 'RS256'});
        return token;
    }

    return usuario_model;
}