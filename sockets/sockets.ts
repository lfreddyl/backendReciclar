import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { interfaceUsuario } from '../app/api/interfaces/interfaces';


export const usuariosConectados= new UsuariosLista();






//
export const conectarCliente = ( cliente: Socket ,io:socketIO.Server) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario )


}


export const desconectar= (cliente: Socket, io:socketIO.Server) => {

    cliente.on('disconnect',() => {
    
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista())

    })
  

}

export const mensajes= (cliente: Socket, io:socketIO.Server) => {
    

    cliente.on('mensaje',(payload:{id_usuario:string ,descripcion:string,fecha:string,idReceptor:string,idEmisor:string,idChat:string}) => {
       let usuarioaEmisor=usuariosConectados.getUsuarioByIdBD(payload.idEmisor);
       let usuarioaReceptor=usuariosConectados.getUsuarioByIdBD(payload.idReceptor);
        
        for (let index = 0; index < usuarioaEmisor.length; index++) {
        io.sockets.to(usuarioaEmisor[index].id).emit('mensaje-nuevo', payload);
        }
        for (let index = 0; index < usuarioaReceptor.length; index++) {
        io.sockets.to(usuarioaReceptor[index].id).emit('mensaje-nuevo', payload);
        }

    })
}

export const notificaciones= (cliente: Socket, io:socketIO.Server) => {
    

    cliente.on('notificacion',(payload:{id_usuario:string ,descripcion:string,fecha:string,leida:boolean,tipo:string}) => {
       let usuario=usuariosConectados.getUsuarioByIdBD(payload.id_usuario);
       console.log(usuario)
        for (let index = 0; index < usuario.length; index++) {
        io.sockets.to(usuario[index].id).emit('notificacion-nuevo', payload);
        }
        

    })
}
export const actualizarCliente= (cliente: Socket, io:socketIO.Server) => {
    

    cliente.on('actualizarUsuario',(payload:{usuario:interfaceUsuario}) => {
       let usuarios=usuariosConectados.getUsuarioByIdBD(String(payload.usuario._id));
        for (let index = 0; index < usuarios.length; index++) {
        io.sockets.to(usuarios[index].id).emit('usuario-nuevo', payload);
        }
        

    })
}

export const configurarUsuario= (cliente: Socket,io:socketIO.Server) => {

    cliente.on('configurar-usuario',(payload:{ identificadorBD: string}, callback: Function) => { 
        usuariosConectados.actualizarNombre(cliente.id,payload.identificadorBD);
        
   io.emit('usuarios-activos', usuariosConectados.getLista())
   
        
     callback({
            ok:true,
            mensaje:`${payload.identificadorBD} configurado`
    })

    })
   

}

export const obtenerUsuariosActivos= (cliente: Socket,io:socketIO.Server) => {

    cliente.on('obtener-usuarios',()=> {
        io.sockets.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista())
    });
}

