import { userController } from '../app/api/controllers/userController';
import { Usuario } from './usuario';
export  class UsuariosLista{

   
    private lista: Usuario[] = [];


    constructor() { }

    // Agregar un usuario
    public agregar( usuario: Usuario ) {

        this.lista.push( usuario );
        return usuario
    }

    public actualizarNombre( id: string, nombre: string ) {

        for( let usuario of this.lista ) {

            if ( usuario.id === id ) {
                usuario.identificadorBD = nombre;
                break;
            }

        }
        /*console.log('========UsuariosActivos==============')
        console.log(this.lista)
        console.log('================================')*/


    }

    // Obtener lista de usuarios
    public getLista() {
        return this.lista.filter(usuario=> usuario.nombre!='sin-nombre');
    }

    // Obtener un usuario
    public getUsuario( id: string ) {

        return this.lista.find( usuario => usuario.id === id );

    }
        // Obtener un usuario
    public getUsuarioByIdBD( idBD: string ) {
            var arrayUser:Usuario[]=[]
            var cont=0;
            for (let index = 0; index < this.lista.length; index++) {
                if(this.lista[index].identificadorBD===idBD){
                    arrayUser[cont] = this.lista[index];
                    cont++;
                }
            }
            console.log('========UsuariosporIDBD==============')
             console.log(arrayUser)
             console.log('================================')
            return arrayUser;
    }
    

    // Obtener usuario en una sala en particular
    public getUsuariosEnSala( sala: string ) {

        return this.lista.filter( usuario =>usuario.sala === sala );

    }

    // Borrar Usuario
    public borrarUsuario( id: string ) {

        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );
        //console.log('========borarUsuario==============')
        //console.log(this.lista)
        //console.log('================================')

       
        return tempUsuario;
        
    }

}