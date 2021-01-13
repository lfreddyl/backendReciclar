import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
   
    nombres: {
        type: String,
        required:'El  nombre es requerido',
       
    },
   apellidos: {
        type: String,
        
    },
    correo: {
        type: String,
        required:'El  correo es requerido',
        unique: true,
        
    },
    telefono: {
        type: String,
        default:null
        
    },
    password: {
        type: String,
        required:'El  password es requerido'
    },
    direccion: {
        type: String,
        default:null
    },
    delete:{
        type:Boolean,
        default:false
    },
    img:{
        type:String,
        
    },
    notificaciones:{
        type:Array
    },
    notificacion_leido:{
        type:Boolean,
        
    },
    mensaje_leido:{
        type:Boolean
    }

},{ versionKey: false });