import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const PostulacionSchema = new Schema({
    id_usuario:{type: Schema.Types.ObjectId,ref:"usuario", required:'El  userid es requerido'},
    id_publicacion:{type: Schema.Types.ObjectId,ref:"postulacion", required:'El postulacionid es requerido'},
    estado:{type:String, default:null},
    fecha:{type:String}
    
},{ versionKey: false }); 