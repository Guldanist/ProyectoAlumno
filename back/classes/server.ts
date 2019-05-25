import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import {Response,Request, NextFunction} from 'express';

export class Server{
    public app:express.Application;
    public puerto:any;
    public httpServer:http.Server;
    public io:socketIO.Server;

    constructor(){
        this.app = express();
        this.app.use((req:Request,res:Response,next:NextFunction)=>{
            res.header('Access-Control-Allow-Origin','http://localhost:4200');
            res.header('Access-Control-Allow-Headers','Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods','GET, POST');
            res.header('Allow','GET, POST');
            next();
        });
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.puerto = process.env.PORT || 3000;
        this.configurarBodyParser();
        this.asignarRutas();
        this.escucharSockets();
    }

    configurarBodyParser(){
        var bodyParser = require('body-parser');
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    escucharSockets(){
        console.log("Escuchando los sockets");

        this.io.on('connect',(cliente)=>{
            
            let objCliente = new Cliente(cliente.id);
            this.clientes.add(objCliente);
            console.log("nueva lista de conectados");
            console.log(this.clientes.getClientes());    

            cliente.on('disconnect',()=>{
                console.log(`El cliente ${cliente.id} se desconectó`);
                this.clientes.remove(cliente.id);
                this.io.emit('retorno-usuarios',this.clientes.getClientes());
            });


        });
    }

    asignarRutas(){
        this.app.get('/',(req,res)=>{
            res.send("Buenas");
        });
        this.app.post('/enviar-mensaje',(req,res)=>{
            let {para,mensaje,de} = req.body;
            let content = {
                mensaje:mensaje,
                nombre:de
            };
            this.io.to(para).emit('nuevo-mensaje',content);
            res.status(200).send('');
        })
    }

    start(){
        this.httpServer.listen(this.puerto,()=>{
            console.log("Servidor corriendo exitosamente en el puerto "
                        + this.puerto);
        });
    }
}