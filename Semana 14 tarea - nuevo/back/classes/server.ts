import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { Response, Request, NextFunction } from 'express';

export default class Server {
    public app: express.Application;
    public puerto: any;
    public httpServer: http.Server;
    public io: socketIO.Server;

    constructor() {
        this.app = express();
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST');
            res.header('Allow', 'GET, POST');
            next();
        });
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.puerto = process.env.PORT || 3001;
        this.configurarBodyParser();
        this.asignarRutas();
        this.escucharSockets();
    }

    configurarBodyParser() {
        var bodyParser = require('body-parser');
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    escucharSockets() {
        console.log("Escuchando los sockets");

        this.io.on('connect', socket => {

            socket.on('disconnect', () => {
                console.log(`Un socket se desconectó`);
            });

            socket.on('MatriAlumWithNote', (obj) => {
                let content = {
                    obj: obj,
                }
                this.io.emit('nuevo-mensaje', content);
            });
        });
    }

    asignarRutas() {
        this.app.get('/', (req, res) => {
            res.send("Buenas");
        });
        this.app.post('/enviar-mensaje', (req, res) => {
            let { para, mensaje, de } = req.body;
            let content = {
                mensaje: mensaje,
                nombre: de
            };
            this.io.to(para).emit('nuevo-mensaje', content);
            res.status(200).send('');
        })
    }

    start() {
        this.httpServer.listen(this.puerto, () => {
            console.log("Servidor corriendo exitosamente en el puerto "
                + this.puerto);
        });
    }
}