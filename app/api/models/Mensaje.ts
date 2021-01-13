import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const MensajeSchema = new Schema({
    id_usuario:{type: Schema.Types.ObjectId,ref:"usuario", required:'El  userid es requerido'},
    descripcion:{type:String,required:'la descripcion es requerido' },
    fecha: {type:Date,required:'la fecha es requerido'},
    id_chat:{type: Schema.Types.ObjectId,ref:"chat", required:'El  chatid es requerido'},
    leido:{type:Boolean},
},{ versionKey: false });