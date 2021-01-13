"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    // Agregar un usuario
    agregar(usuario) {
        this.lista.push(usuario);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.identificadorBD = nombre;
                break;
            }
        }
        /*console.log('========UsuariosActivos==============')
        console.log(this.lista)
        console.log('================================')*/
    }
    // Obtener lista de usuarios
    getLista() {
        return this.lista.filter(usuario => usuario.nombre != 'sin-nombre');
    }
    // Obtener un usuario
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    // Obtener un usuario
    getUsuarioByIdBD(idBD) {
        var arrayUser = [];
        var cont = 0;
        for (let index = 0; index < this.lista.length; index++) {
            if (this.lista[index].identificadorBD === idBD) {
                arrayUser[cont] = this.lista[index];
                cont++;
            }
        }
        console.log('========UsuariosporIDBD==============');
        console.log(arrayUser);
        console.log('================================');
        return arrayUser;
    }
    // Obtener usuario en una sala en particular
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    // Borrar Usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        //console.log('========borarUsuario==============')
        //console.log(this.lista)
        //console.log('================================')
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
