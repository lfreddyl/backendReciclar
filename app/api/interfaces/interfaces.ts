
export interface interfaceUsuario {
            _id?: String,
            nombres: String,
            apellidos: String,
            correo:String,
            telefono?:String,
            direccion?: String,
            password: String,
            delete?: Boolean
            img?:String
            notificaciones?:Array<interfaceNotificacion>;
            notificacion_leido?:Boolean,
            mensaje_leido?:Boolean
            
}
export interface interfacePublicacion {
    _id?: String,
    id_usuario:String,
    descripcion: String,
    img:String,
    tipo?: String,
    cantidad?: Number,
    direccion: String,
    fecha:Date,
    estado:String,
    residuos?:Array<interfaceResiduo>,
    delete?:Boolean
}
export interface interfaceResiduo{
    _id?: String,
    descripcion:String,
    tipo: Number,
    
}
export interface interfaceChat {
    _id?: String,
    id_receptor:String,
    id_emisor:String,
    fecha: Date,
    delete?:Boolean,
    leido_receptor?:Boolean
    leido_emisor?:Boolean

}
export interface interfaceMensaje {
    _id?: String,
    descripcion:String,
    fecha: Date,
    id_usuario:String,
    id_chat:String
    leido?:Boolean
}
export interface interfaceNotificacion {
    _id?: String,
    descripcion:String,
    tipo:String,
    fecha:Date,
    id_usuario?:String,
    id_publicacion?:String,
    leida:boolean
}
export interface interfacePostulacion {
    _id?: String,
    id_publicacion:String,
    id_usuario: String,
    estado:String
    fecha:String
}










