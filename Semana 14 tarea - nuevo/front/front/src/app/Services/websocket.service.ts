import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(public _socket: Socket,
    private _router: Router) {
    this.checkStatus();
  }

  checkStatus() {
    this._socket.on('connect', () => {
      console.log("Conectado al servidor de sockets");
    });
    this._socket.on('disconnect', () => {
      console.log("Desconectado al servidor de sockets");
    });
  }

  recuperarAlumnosNotas(AlumnosNotas: string) {
    this._socket.emit('MatriAlumWithNote', AlumnosNotas);
  }
}