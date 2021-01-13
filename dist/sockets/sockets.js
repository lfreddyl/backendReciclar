"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuariosActivos = exports.configurarUsuario = exports.actualizarCliente = exports.notificaciones = exports.mensajes = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
//
const conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
const mensajes = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        let usuarioaEmisor = exports.usuariosConectados.getUsuarioByIdBD(payload.idEmisor);
        let usuarioaReceptor = exports.usuariosConectados.getUsuarioByIdBD(payload.idReceptor);
        for (let index = 0; index < usuarioaEmisor.length; index++) {
            io.sockets.to(usuarioaEmisor[index].id).emit('mensaje-nuevo', payload);
        }
        for (let index = 0; index < usuarioaReceptor.length; index++) {
            io.sockets.to(usuarioaReceptor[index].id).emit('mensaje-nuevo', payload);
        }
    });
};
exports.mensajes = mensajes;
const notificaciones = (cliente, io) => {
    cliente.on('notificacion', (payload) => {
        let usuario = exports.usuariosConectados.getUsuarioByIdBD(payload.id_usuario);
        console.log(usuario);
        for (let index = 0; index < usuario.length; index++) {
            io.sockets.to(usuario[index].id).emit('notificacion-nuevo', payload);
        }
    });
};
exports.notificaciones = notificaciones;
const actualizarCliente = (cliente, io) => {
    cliente.on('actualizarUsuario', (payload) => {
        let usuarios = exports.usuariosConectados.getUsuarioByIdBD(String(payload.usuario._id));
        for (let index = 0; index < usuarios.length; index++) {
            io.sockets.to(usuarios[index].id).emit('usuario-nuevo', payload);
        }
    });
};
exports.actualizarCliente = actualizarCliente;
const configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.identificadorBD);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `${payload.identificadorBD} configurado`
        });
    });
};
exports.configurarUsuario = configurarUsuario;
const obtenerUsuariosActivos = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.sockets.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuariosActivos = obtenerUsuariosActivos;
