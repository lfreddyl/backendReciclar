import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ResiduoSchema = new Schema({
    
    descripcion:{type:String,required:'la descripcion es requerido'},
    tipo: {type:String,required:'el tipo es requerido'},
    
},{ versionKey: false });