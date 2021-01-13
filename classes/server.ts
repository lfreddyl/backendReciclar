import express from 'express';
import { SERVER_PORT, URL_MONGODB } from '../global/env';
import socketIO from 'socket.io'
import http from 'http'
import * as socket from '../sockets/sockets'
import{router} from '../routes/router';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
export default class Server{

private static _intance: Server;

public io:socketIO.Server;
private httpServer: http.Server;

public app: express.Application;
public port:number;
public routePrv: router = new router();
public mongoURl:string= URL_MONGODB;
private constructor(){
    
    this.app=express();
    this.config();
    this.routePrv.route(this.app);
    this.port=SERVER_PORT
    this.mongoSetup();
    this.httpServer=new http.Server(this.app);
    this.io=socketIO(this.httpServer);
    this.escucharSockets();
   
}
private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    
 }

private mongoSetup(){
    mongoose.connect(URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   
}

public static get instance(){
return this._intance||(this._intance=new this());
}

//escuchar sockets

private escucharSockets(){
    console.log('escuchando sockets')
    this.io.on('connection',cliente=>{

    //confiugracion de mapas
   
    //
    socket.conectarCliente(cliente,this.io);
   
    socket.configurarUsuario(cliente,this.io);
   
    // Desconectar

    socket.desconectar(cliente, this.io);
    
    //Mensajes

    socket.mensajes(cliente, this.io);
    socket.notificaciones(cliente,this.io)
    socket.actualizarCliente(cliente,this.io)
    //
    socket.obtenerUsuariosActivos(cliente,this.io);
    
})
}

start(callback: Function){
this.httpServer.listen(this.port, callback());
}
}

