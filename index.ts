import Server from './classes/server';


import cors from 'cors';


const server= Server.instance;

//BodyParser



//CORS
server.app.use( cors({ origin: true, credentials: true }) );
//RUTAS DE SERVICIOS
server.start( ()=> {
console.log(server.port)
});